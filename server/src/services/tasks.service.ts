import mongoose from "mongoose";
import {
  TASK_POPULATE_SELECTED_FIELDS,
  TASK_POPULATE_STATUS_SELECTED_FIELDS,
} from "../config/constants/task.constants.js";
import Task from "../models/tasks/task.model.js";
import { TaskUpdate } from "../models/tasks/taskUpdates.js";
import TaskStatuses from "../models/tasks/taskStatus.model.js";
import User from "../models/user.model.js";

export const getAllPopulateTasks = async () => {
  return Task.find()
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
};

// Helper function to populate a field by its ObjectId value
const populateField = async (value: any, fieldName: any) => {
  switch (fieldName) {
    case "status":
      return await TaskStatuses.findById(value).lean();
    case "assignee":
      return await User.findById(value).lean();
    case "followers":
      return await User.findById(value).lean();
    case "created_by":
      return await User.findById(value).lean();
    // Add more cases for other fields if needed
    default:
      return value; // Return the original value if no population needed
  }
};

export const getPopulateTask = async (taskId: string) => {
  const task: any = await Task.findById(taskId)
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
    })
    .lean();

  // Fetch the related TaskUpdate documents for the Task
  const taskUpdates = await TaskUpdate.find({ taskId });

  // Create an array of promises for populating fromValue and toValue
  const populatePromises = taskUpdates.map(async (update) => {
    const { fieldName, fromValue, toValue, updated_by, createdAt }: any =
      update;
    const populatedFromValue =
      fromValue instanceof mongoose.Types.ObjectId
        ? await populateField(fromValue, fieldName)
        : fromValue;
    const populatedToValue =
      toValue instanceof mongoose.Types.ObjectId
        ? await populateField(toValue, fieldName)
        : toValue;

    return {
      fieldName,
      fromValue: populatedFromValue,
      toValue: populatedToValue,
      updated_by,
      createdAt,
    };
  });

  // Execute all population promises
  const populatedUpdates = await Promise.all(populatePromises);

  // Add the populated updates to the task object only if populatedUpdates is valid
  task.history ??= populatedUpdates;

  return task;
};

// Function to create TaskUpdate document
export const createTaskUpdate = async (
  taskId: string,
  fieldName: string,
  fromValue: string,
  toValue: string,
  updated_by: string
) => {
  try {
    // Create a new TaskUpdate document
    const taskUpdate = await TaskUpdate.create({
      taskId,
      updated_by,
      fieldName,
      fromValue,
      toValue,
    });

    return taskUpdate;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
