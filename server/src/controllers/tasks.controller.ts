import { Request, Response, NextFunction } from "express";
import Task from "../models/task.model.js";
import { BadRequestError, NotFoundError } from "../errors/Errors.js";
import TaskStatuses from "../models/taskStatus.model.js";

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
    if (!task) {
      return next(new NotFoundError(`Task: "${taskId}" not found`));
    }
    res.status(200).send(task);
  } catch (error) {
    console.log(error);
    next(new BadRequestError(String(error)));
  }
};

interface ICreateTaskPropsType extends Request {
  userId: string;
}

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
  console.log(req.body);

  if (!title || !type || !description || !due_date || !priority || !status) {
    return next(new BadRequestError());
  }

  try {
    // Getting the user who created the task
    const { userId: createdByUserId } = req as ICreateTaskPropsType;

    // Creating new slug for easy url's
    const slug = String(title).toLowerCase().replace(/\s+/g, "_");
    // console.log(req.body);
    // console.log(assignee);
    // console.log(followers);
    // return res.end()

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
    const {
      title,
      description,
      due_date,
      priority,
      assignee,
      followers,
      created_by,
      status,
    } = req.body;

    // if (
    //   title ||
    //   description ||
    //   due_date ||
    //   priority ||
    //   assignee ||
    //   followers ||
    //   created_by ||
    //   status
    // ) {

    //   return next(new BadRequestError());
    // }

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

  const deletedTask = await Task.findByIdAndRemove(taskId, { new: true });
  if (!deletedTask) {
    return next(new NotFoundError(`Task: "${taskId}" not found`));
  }

  res.status(201).send({ error: false, data: deletedTask });
};
/*
/* Task Statuses
*/
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
