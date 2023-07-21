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

// Helper function to populate a single field or an array of fields
const populateField = async (field: any, schema?: any) => {
  if (Array.isArray(field)) {
    // If it's an array, populate each element
    const populatedArray = await Promise.all(
      field.map(async (item: any) => {
        if (item instanceof mongoose.Types.ObjectId && schema) {
          return await schema.findById(item);
        }
        return item;
      })
    );
    return populatedArray;
  } else if (field instanceof mongoose.Types.ObjectId && schema) {
    // If it's a single ObjectId, populate it
    return await schema.findById(field);
  }
  return field;
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
  const taskUpdates = await getPopulateTaskUpdates(taskId);

  console.log(taskUpdates);
  // Create an array to store the modified taskUpdates
  // const updatedTaskUpdates = [];

  // for (const update of taskUpdates) {
  //   const updatedFields = [];
  //   for (const change of update.changes) {
  //     // Populate the 'from' and 'to' fields if they are mongoose.Types.ObjectId
  //     const populatedFrom = await populateField(change.from, <corresponding schema>);
  //     const populatedTo = await populateField(change.to, <corresponding schema>);

  //     const updatedField = {
  //       field: change.field,
  //       from: populatedFrom,
  //       to: populatedTo,
  //       updated_at: update.updated_at,
  //     };
  //     updatedFields.push(updatedField);
  //   }

  //   // Add the updated fields to the taskUpdates array
  //   updatedTaskUpdates.push(...updatedFields);
  // }

  // // Assign the updated taskUpdates to the task object
  task.taskUpdates = taskUpdates;

  return task;
};

// Function to create TaskUpdate document
export const createTaskUpdate = async (
  taskId: string,
  changes: Array<{ field: string; from: string; to: string }>,
  updated_by: string
) => {
  try {
    // Create a new TaskUpdate document
    const taskUpdate = await TaskUpdate.create({
      taskId,
      updated_by,
      changes,
    });

    return taskUpdate;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get populated task updates for a task
export const getPopulateTaskUpdates = async (taskId: string) => {
  // Fetch the related TaskUpdate documents for the Task
  const taskUpdates = await TaskUpdate.find({ taskId });

  // Create an array to store the modified taskUpdates
  const updatedTaskUpdates = [];

  for (const update of taskUpdates) {
    const updatedFields = [];
    for (const change of update.changes) {
      // Get the corresponding schema based on the field name
      let correspondingSchema;
      switch (change.field) {
        case "status":
          correspondingSchema = TaskStatuses; // Replace TaskStatuses with the actual model for task statuses
          break;
        case "assignee":
          correspondingSchema = User;
        case "followers":
          correspondingSchema = User; // Replace User with the actual model for users
          break;
        // Add more cases as needed for other fields in your schema
        default:
          correspondingSchema = null; // Use null or undefined if you don't have a specific schema to populate
          break;
      }

      // Populate the 'from' and 'to' fields if they are mongoose.Types.ObjectId
      const populatedFrom = await populateField(
        change.from,
        correspondingSchema
      );
      const populatedTo = await populateField(change.to, correspondingSchema);

      const updatedField = {
        field: change.field,
        from: populatedFrom,
        to: populatedTo,
        updated_at: update.updated_at,
      };
      updatedFields.push(updatedField);
    }

    // Add the updated fields to the taskUpdates array
    updatedTaskUpdates.push(...updatedFields);
  }

  return updatedTaskUpdates;
};
