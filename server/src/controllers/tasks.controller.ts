import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import Task from "../models/task.model.js";
import { BadRequestError, NotFoundError } from "../errors/Errors.js";
import TaskStatuses from "../models/taskStatus.model.js";
import { ICreateTaskPropsType } from "../types/global.js";
import {
  TASK_CLONE_SELECTED_FIELD,
  TASK_POPULATE_SELECTED_FIELDS,
  TASK_POPULATE_STATUS_SELECTED_FIELDS,
} from "../config/constants/task.constants.js";
import { createSlugFromText } from "../utils/text.util.js";
import { uploadTasksAttachments } from "../utils/files.util.js";

// Get all
export const allTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tasks = await Task.find()
    .populate({
      path: "created_by",
      select: ["firstName", "lastName", "email", "role", "imgSRC"],
    })
    .populate({
      path: "assignee",
      select: ["firstName", "lastName", "email", "role", "imgSRC"],
    })
    .populate({
      path: "followers",
      select: ["firstName", "lastName", "email", "role", "imgSRC"],
    })
    .populate({
      path: "status",
      select: ["_id", "label", "color"],
    });
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
    const task = await Task.findById(taskId)
      .populate({
        path: "created_by",
        select: TASK_POPULATE_SELECTED_FIELDS,
      })
      .populate({
        path: "assignee",
        select: TASK_POPULATE_SELECTED_FIELDS,
      })
      .populate({
        path: "followers",
        select: TASK_POPULATE_SELECTED_FIELDS,
      })
      .populate({
        path: "status",
        select: TASK_POPULATE_STATUS_SELECTED_FIELDS,
      });
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

// Edit
export const editTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { taskId } = req.params;
    const editedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        ...req.body,
      },
      { new: true }
    );

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

    // Get the user id who perfome the action
    const { userId: createdByUserId } = req as ICreateTaskPropsType;

    // Get clone options
    const { cloneAssignee, cloneFollowers, clonePriority } =
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
    return next(new BadRequestError("Not provided task id"));
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
    next(new BadRequestError(String(error)));
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
    next(new BadRequestError(String(error)));
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
    next(new BadRequestError(String(error)));
  }
};

export const uploadAttachments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { taskId, attachments } = req.body;
    const { taskId } = req.params;
    const files = req.files;

    if (!files || !taskId) return next(new BadRequestError());

    const filesNames = await uploadTasksAttachments(next, files, taskId);
    const task = await Task.findById(taskId)
      .populate({
        path: "created_by",
        select: TASK_POPULATE_SELECTED_FIELDS,
      })
      .populate({
        path: "assignee",
        select: TASK_POPULATE_SELECTED_FIELDS,
      })
      .populate({
        path: "followers",
        select: TASK_POPULATE_SELECTED_FIELDS,
      })
      .populate({
        path: "status",
        select: TASK_POPULATE_STATUS_SELECTED_FIELDS,
      });

    filesNames?.forEach((item) => {
      const filePaths = `${process.env.BASE_ENDPOINT}${taskId}/${item}`;
      const isFileExist = task?.attachments.some((item) => item === filePaths);

      if (isFileExist) {
        return;
      }

      // push attachments to task
      task?.attachments.push(filePaths);
    });

    task?.save();

    res.status(200).send({ error: false, data: task });
  } catch (error) {
    console.log(error);
    next(new BadRequestError(String(error)));
  }
};
