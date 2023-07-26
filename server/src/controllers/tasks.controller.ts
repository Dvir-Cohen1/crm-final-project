import { Request, Response, NextFunction } from "express";
import Task from "../models/tasks/task.model.js";
import archiver from "archiver";
import fs from "fs";
import {
  BadRequestError,
  NotFoundError,
  ServerError,
} from "../errors/Errors.js";
import TaskStatuses from "../models/tasks/taskStatus.model.js";
import { ICreateTaskPropsType } from "../types/global.js";
import { TASK_CLONE_SELECTED_FIELD } from "../config/constants/task.constants.js";
import { createSlugFromText } from "../utils/text.util.js";
import {
  deleteAllFiles,
  deleteOneFile,
  uploadFiles,
} from "../utils/files.util.js";
import {
  createTaskUpdate,
  getAllPopulateTasks,
  getPopulateTask,
} from "../services/tasks.service.js";
import TaskComment from "../models/tasks/taskComments.js";

// Get all
export const allTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tasks = await getAllPopulateTasks();
  res.status(201).send(tasks);
};
// Get one
export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { taskId } = req.params;
  if (!taskId) {
    return next(new BadRequestError("Not provided task id"));
  }

  try {
    const task = await getPopulateTask(taskId);
    if (!task) {
      return next(new NotFoundError(`Task: "${taskId}" not found`));
    }
    res.status(200).send(task);
  } catch (error) {
    console.log(error);
    next(new BadRequestError(String(error)));
  }
};

// Create
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    title,
    type,
    description,
    due_date,
    priority,
    assignee,
    followers,
    status,
  } = req.body;

  if (!title || !type || !description || !due_date || !priority || !status) {
    return next(new BadRequestError());
  }

  try {
    // Getting the user who created the task
    const { userId: createdByUserId } = req as ICreateTaskPropsType;

    // Creating new slug for easy url's
    const slug = String(title).toLowerCase().replace(/\s+/g, "_");
    // Creating the Task
    const newTask = await Task.create({
      slug,
      type: type.toLowerCase(),
      title,
      description,
      due_date,
      priority,
      assignee,
      followers,
      status,
      created_by: createdByUserId,
    });
    // If theres new assignee/followers push them to model
    // assignee && newTask.assignee?.push(assignee);
    // followers && newTask.followers?.push(followers);

    res.status(201).send(newTask);
  } catch (error: any) {
    console.log(error);
    next(new BadRequestError(String(error)));
  }
};

export const editTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { taskId } = req.params;
    const { userId: createdByUserId } = req as ICreateTaskPropsType;

    const existingTask: any = await Task.findById(taskId);

    if (!existingTask) {
      return next(new NotFoundError("Task not found"));
    }

    // Create a copy of the existing task data
    const previousData: any = existingTask.toObject();

    // Update the task with the new data
    existingTask.set(req.body);
    const editedTask = await existingTask.save();

    const keyName = Object.keys(req.body)[0];

    await createTaskUpdate(
      taskId,
      keyName,
      previousData[keyName],
      existingTask[keyName],
      createdByUserId
    ); // Assuming req.userId is available through middleware

    res.status(200).send({ error: false, data: editedTask });
  } catch (error) {
    console.log(error);
    next(new BadRequestError(String(error)));
  }
};

// clone task
export const cloneTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { taskId } = req.params;

    const taskToBeCloned = await Task.findById(taskId).select(
      TASK_CLONE_SELECTED_FIELD
    );

    // Get the user id who perform the action
    const { userId: createdByUserId } = req as ICreateTaskPropsType;

    // Get clone options
    const { cloneAssignee, cloneFollowers, clonePriority, cloneAttachments } =
      req.body.cloneOptions;
    // Get the new task title if changed else stay the same as original
    const { clonedTaskTitle } = req.body;

    const clonedTask: any = new Task();

    // Create new task slug (for situation when the title changed..)
    const slug = createSlugFromText(clonedTaskTitle);

    // Set cloned task properties
    clonedTask.slug = slug;
    clonedTask.title = clonedTaskTitle;
    clonedTask.type = taskToBeCloned?.type;
    clonedTask.description = taskToBeCloned?.description;
    clonedTask.due_date = taskToBeCloned?.due_date;
    clonedTask.created_by = createdByUserId;
    clonedTask.status = taskToBeCloned?.status;

    if (cloneAssignee) {
      let assignees: [] | any = [];
      taskToBeCloned?.assignee.forEach((item: any) => {
        assignees.push(item);
      });

      clonedTask.assignee = assignees;
    }

    if (cloneFollowers) {
      let followers: [] | any = [];
      taskToBeCloned?.followers.forEach((item: any) => {
        followers.push(item);
      });

      clonedTask.followers = followers;
    }

    if (clonePriority) {
      clonedTask.priority = taskToBeCloned?.priority;
    }
    if (cloneAttachments) {
      clonedTask.attachments = taskToBeCloned?.attachments;
    }

    await clonedTask.save();
    res.status(201).send({ error: false, data: clonedTask });
  } catch (error) {
    console.log(error);
    next(new BadRequestError(String(error)));
  }
};

// Delete
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { taskId } = req.params;
  if (!taskId) {
    return next(new BadRequestError("taskId not provided"));
  }
  // return console.log(taskId)
  const deletedTask = await Task.findByIdAndRemove(taskId, { new: true });
  if (!deletedTask) {
    return next(new NotFoundError(`Task: "${taskId}" not found`));
  }

  res.status(201).send({ error: false, data: deletedTask });
};

// Task Statuses

export const getTaskStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskStatuses = await TaskStatuses.find();
    res.status(200).send({ error: false, data: taskStatuses });
  } catch (error) {
    next(new ServerError(String(error)));
  }
};

export const createTaskStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { label, color } = req.body;
    const { userId: createdByUserId } = req as ICreateTaskPropsType;

    const newTaskStatus = await TaskStatuses.create({
      label,
      color,
      created_by: createdByUserId,
    });
    res.status(200).send({ error: false, data: newTaskStatus });
  } catch (error) {
    next(new ServerError(String(error)));
  }
};

export const removeTaskStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { statusId } = req.params;
    if (!statusId) {
      return next(new BadRequestError());
    }

    const removedTaskStatus = await TaskStatuses.findByIdAndDelete(statusId);
    res.status(200).send({ error: false, data: removedTaskStatus });
  } catch (error) {
    next(new ServerError(String(error)));
  }
};

export const uploadAttachments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { taskId } = req.params;
    const { userId } = req as ICreateTaskPropsType;
    const files: any = req.files;

    if (!files || !files.length || !taskId) return next(new BadRequestError());

    const task = await getPopulateTask(taskId);

    // Get and filter the files that already existed in the task
    const existingFileNames = task?.attachments.map((obj: any) => obj.name);
    const filteredFiles = files.filter(
      (file: any) => !existingFileNames?.includes(file.originalname)
    );

    if (filteredFiles.length === 0) {
      return next(
        new BadRequestError(files.length > 1 ? "files exist" : "file exist")
      );
    }

    // Upload the files
    const uploadedFiles: any = await uploadFiles(next, filteredFiles, taskId);

    // Push uploaded files to task attachments
    if (uploadedFiles?.isError) {
      return next(new BadRequestError(String(uploadedFiles)));
    }
    const uploadedFilesNames: [] = uploadedFiles
      .map((item: { name: string }) => item.name)
      .join(" , ");

    const previousAttachmentsLength = task?.attachments.length;
    let previousAttachments;
    if (previousAttachmentsLength > 0) {
      previousAttachments = task?.attachments
        .map((item: { name: string }) => item.name)
        .join(" , ");
    }

    uploadedFiles?.forEach((item: any) => {
      const filePath = `${process.env.BASE_ENDPOINT}${taskId}/${item.name}`;
      task?.attachments.push({
        name: item.name,
        type: item.type,
        size: item.size,
        path: filePath,
        uploadedBy: userId,
      });
    });
    await Task.findOneAndUpdate(task._id, task, {
      new: true,
    });

    // await task?.save();
    // const taskHasAttachments = task?.attachments.length === 0 && "None";
    await createTaskUpdate(
      taskId,
      "attachments",
      previousAttachmentsLength === 0 ? "None" : previousAttachments,
      uploadedFilesNames,
      userId
    );

    res.status(200).send({ error: false, data: task });
  } catch (error) {
    console.log(error);
    next(new ServerError(String(error)));
  }
};

export const deleteAllAttachments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { taskId } = req.params;
    const isAllDeleted: boolean | null = deleteAllFiles(taskId);

    const task: any = await getPopulateTask(taskId);

    // Get previous tasks attachments to create update
    const attachmentsLength = task?.attachments.length;

    let previousAttachments;
    if (attachmentsLength > 0) {
      previousAttachments = task?.attachments
        .map((item: { name: string }) => item.name)
        .join(" , ");
    }

    if (task !== undefined) {
      task.attachments = [];
      await Task.findOneAndUpdate(task._id, task);
      // await task.save();
    }

    if (isAllDeleted === null) {
      return next(new BadRequestError("No files to delete"));
    }

    // const uploadedFilesNames: [] = uploadedFiles
    // .map((item: { name: string }) => item.name)
    // .join(" , ");

    const { userId: createdByUserId } = req as ICreateTaskPropsType;

    await createTaskUpdate(
      taskId,
      "attachments",
      attachmentsLength === 0 ? "None" : previousAttachments,
      "None",
      createdByUserId
    );

    res.status(200).send({ error: !isAllDeleted, data: task });
  } catch (error) {
    console.log(error);
    next(new ServerError(String(error)));
  }
};

export const deleteOneAttachment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { taskId, fileName } = req.params;

    if (!taskId || !fileName) {
      return next(new BadRequestError("TaskId / fileName not provided"));
    }

    const isOneDeleted: boolean | null = deleteOneFile(taskId, fileName);

    if (isOneDeleted === null) {
      return next(new BadRequestError("No files to delete"));
    }

    const task: any = await getPopulateTask(taskId);
    const attachmentsLength: any = task.attachments.length || 0;

    let previousAttachments;
    if (attachmentsLength > 0) {
      previousAttachments = task?.attachments
        .map((item: { name: string }) => item.name)
        .join(" , ");
    }

    if (task !== undefined) {
      task.attachments = task.attachments.filter(
        (attachment: { name: string }) => attachment.name !== fileName
      );
      await Task.findOneAndUpdate(task._id, task);
      // await task.set();
    }

    const { userId: createdByUserId } = req as ICreateTaskPropsType;

    await createTaskUpdate(
      taskId,
      "attachments",
      attachmentsLength === 0 ? "None" : previousAttachments,
      fileName,
      createdByUserId
    );

    res.status(200).send({ error: !isOneDeleted, data: task });
  } catch (error) {
    console.log(error);
    next(new ServerError(String(error)));
  }
};

// Download attachments as zip files
export const downloadAttachments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { taskId } = req.params;
    const folderPath = `./public/${taskId}`;
    const zipFileName = `${taskId}.zip`;

    // Set the appropriate headers for the response
    res.set({
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename=${zipFileName}`,
    });

    const output = fs.createWriteStream(`./src/tmp/${taskId}.zip`);
    // Create a new zip archive
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Set the compression level (optional)
    });

    // Read the files in the folder and add them to the archive
    const files = await fs.promises.readdir(folderPath);

    // Iterate through the files and add them to the archive
    files.forEach(async (file) => {
      const filePath = `${folderPath}/${file}`;

      // Add the file to the archive
      archive.file(filePath, { name: file });
    });

    // Pipe the archive to the response
    archive.pipe(res);
    // Finalize the archive
    archive.finalize();
    // Handle any errors during archiving
    archive.on("error", (err) => {
      console.log(err);
      res.status(500).send("Error creating zip file");
    });

    archive.on("end", async () => {
      console.log("Zip file created successfully");
      res.end();
    });
    res.once("end", async () => {
      // Clean up the temporary zip file
      await fs.promises.unlink(`./src/tmp/${zipFileName}`);
    });
  } catch (error) {
    console.log(error);
    next(new ServerError(String(error)));
  }
};

/* Task Comments */

// Add task comment
export const addTaskComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content } = req.body;
    const { taskId } = req.params;
    const { userId: createdByUserId } = req as ICreateTaskPropsType;

    if (!content && !taskId) {
      return next(new BadRequestError("taskId or content not provided"));
    }

    const task = await getPopulateTask(taskId);

    // Check if the task exists
    if (!task) {
      return next(
        new NotFoundError("Unable to add comment to task, task not found")
      );
    }

    // Create new comment
    const newTaskComment = await TaskComment.create({
      content,
      postedBy: createdByUserId,
    });

    // Push the new comment to task & save
    task.comments.push(newTaskComment);
    await Task.findOneAndUpdate(task._id, task);
    // await task.save();

    res.send(task);
  } catch (error) {
    console.log(error);
    next(new ServerError(String(error)));
  }
};

// Delete task comment
export const deleteTaskComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { taskId, commentId } = req.params;

    if (!taskId && !commentId) {
      return next(new BadRequestError());
    }

    const task = await getPopulateTask(taskId);

    // Check if the task exists
    if (!task) {
      return next(
        new NotFoundError("Unable to delete comment from task, task not found")
      );
    }

    // Find the index of the comment in the comments array
    const comments = task.comments.toObject();

    const commentIndex = comments.findIndex(
      (comment: { _id: string }) => comment._id?.toString() === commentId
    );

    // Check if the comment exists
    if (commentIndex === -1) {
      return next(new NotFoundError("Comment not found"));
    }

    // Remove the comment from the task's comments array
    task.comments.splice(commentIndex, 1);
    await Task.findOneAndUpdate(task._id, task);
    // await task.save();

    res.send(task);
  } catch (error) {
    console.log(error);
    next(new ServerError(String(error)));
  }
};
