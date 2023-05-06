import { Request, Response, NextFunction } from "express";
import Task from "../models/task.model.js";
import { BadRequestError, NotFoundError } from "../errors/Errors.js";

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
  });
  if (!task) {
    return next(new NotFoundError(`Task: "${taskId}" not found`));
  }
  res.status(200).send(task);
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
  const { title, type, description, due_date, priority, assignee, followers } =
    req.body;

  if (!title || !type || !description || !due_date || !priority) {
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
