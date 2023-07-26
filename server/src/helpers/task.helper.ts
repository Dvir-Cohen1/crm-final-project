import { BadRequestError } from "../errors/Errors";
import { sendLogger } from "../utils/logger";
import { TaskUpdate } from "../models/tasks/taskUpdates";

export const getTaskUpdatesById = async (taskId: string) => {
  try {
    // Find all TaskUpdates related to the given Task ID
    return await TaskUpdate.find({ taskId });
  } catch (error) {
    return null;
  }
};
