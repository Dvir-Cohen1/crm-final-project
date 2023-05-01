import { Request, Response, NextFunction } from "express";
import Task from "../models/task.model.js";
import { BadRequestError, NotFoundError } from "../errors/Errors.js";

// Get all
export const allTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tasks = await Task.find();
  res.status(201).send({ error: false, data: tasks });
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

  const task = await Task.findById(taskId);
  if (!task) {
    return next(new NotFoundError(`Task: "${taskId}" not found`));
  }
  res.status(200).send({ error: false, data: task });
};

// Create
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    title,
    description,
    due_date,
    priority,
    assignee,
    followers,
    created_by,
  } = req.body;

  if (
    !title ||
    !description ||
    !due_date ||
    !priority ||
    !assignee ||
    !followers ||
    !created_by
  ) {
    return next(new BadRequestError());
  }

  const slug = String(title).toLowerCase().replace(/\s+/g, "_");
  const newTask = await Task.create({
    slug,
    title,
    description,
    due_date,
    priority,
    assignee,
    followers,
    created_by,
  });

  res.status(201).send({ error: false, data: newTask });
};

// Edit
export const editTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    title,
    description,
    due_date,
    priority,
    assignee,
    followers,
    created_by,
  } = req.body;

  if (
    !title ||
    !description ||
    !due_date ||
    !priority ||
    !assignee ||
    !followers ||
    !created_by
  ) {
    return next(new BadRequestError());
  }

  const { taskId } = req.params;
  const editedTask = await Task.findByIdAndUpdate(
    taskId,
    {
      title,
      description,
      due_date,
      priority,
      assignee,
      followers,
      created_by,
    },
    { new: true }
  );

  res.status(200).send({ error: false, data: editedTask });
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
