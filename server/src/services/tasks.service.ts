import {
  TASK_POPULATE_SELECTED_FIELDS,
  TASK_POPULATE_STATUS_SELECTED_FIELDS,
} from "../config/constants/task.constants.js";
import Task from "../models/tasks/task.model.js";

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

export const getPopulateTask = async (taskId: string) => {
  return Task.findById(taskId)
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
