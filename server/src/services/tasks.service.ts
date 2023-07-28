import mongoose from "mongoose";
import { Model, Document } from "mongoose";
import {
  TASK_POPULATE_SELECTED_FIELDS,
  TASK_POPULATE_SELECTED_STATUS_FIELDS,
  USER_POPULATE_SELECTED_COMMENTS_FIELDS,
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
      select: TASK_POPULATE_SELECTED_STATUS_FIELDS,
    });
};

// Helper function to populate a field by its ObjectId value
const populateField = async (value: any, fieldName: any) => {
  switch (fieldName) {
    case "status":
      return await TaskStatuses.findById(value);
    case "assignee":
      return await User.findById(value);
    case "followers":
      return await User.findById(value);
    // Add more cases for other fields if needed
    default:
      return value; // Return the original value if no population needed
  }
};

export const getPopulateTask = async (taskId: string) => {
  const task: any = await Task.findById(taskId)
    .populate({
      path: "created_by",
      select: USER_POPULATE_SELECTED_COMMENTS_FIELDS,
    })
    .populate({
      path: "assignee",
      select: USER_POPULATE_SELECTED_COMMENTS_FIELDS,
    })
    .populate({
      path: "followers",
      select: USER_POPULATE_SELECTED_COMMENTS_FIELDS,
    })
    .populate({
      path: "status",
      select: TASK_POPULATE_SELECTED_STATUS_FIELDS,
    })
    .populate({
      path: "comments",
      options: { sort: { _id: -1 } },
      populate: {
        path: "postedBy",
        select: USER_POPULATE_SELECTED_COMMENTS_FIELDS,
      },
    })
    // convert to plain js object instead of Mongoose object for performance porose
    .lean();

  // Fetch the related TaskUpdate documents for the Task
  const taskUpdates = await getTaskUpdatesWithPopulatedFields(taskId);

  // Add the taskUpdates to the task object only if taskUpdates is valid
  task.history ??= taskUpdates;

  return task;
};

const getTaskUpdatesWithPopulatedFields = async (taskId: string) => {
  // Fetch the related TaskUpdate documents for the Task
  const taskUpdates = await TaskUpdate.find({ taskId }).sort({ _id: -1 });

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
      fromValue:
        fieldName === "assignee" || fieldName === "followers"
          ? [
              await User.findById(fromValue).select([
                "firstName",
                "lastName",
                "email",
                "imgSRC",
              ]),
            ]
          : populatedFromValue,
      toValue:
        fieldName === "assignee" || fieldName === "followers"
          ? [
              await User.findById(toValue).select([
                "firstName",
                "lastName",
                "email",
                "imgSRC",
              ]),
            ]
          : populatedToValue,
      updated_by: await User.findById(updated_by).select([
        "firstName",
        "lastName",
        "email",
        "imgSRC",
      ]),

      createdAt,
    };
  });
  // Execute all population promises
  const populatedUpdates = await Promise.all(populatePromises);

  return populatedUpdates;
};

// Function to create TaskUpdate document
export const createTaskUpdate = async (
  taskId: string,
  fieldName: string,
  fromValue: string | [] | undefined,
  toValue: string | [] | undefined,
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

export const getTaskWithPopulatedFields = async (
  Task: Model<Document>,
  taskId: string
) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  // Get the schema paths
  const schemaPaths = Task.schema.paths;

  // Array to store field names to populate
  const fieldsToPopulate = [];

  // Loop through the schema paths and check if the field has a 'ref' option
  for (const path in schemaPaths) {
    if (schemaPaths[path].options.ref) {
      fieldsToPopulate.push(path);
    }
  }

  // Populate the fields based on the 'fieldsToPopulate' array
  await Promise.all(
    fieldsToPopulate.map(async (field) => {
      await task.populate(field);
    })
  );

  return task;
};
