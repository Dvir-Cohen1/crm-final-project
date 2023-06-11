import express from "express";
import {
  allTasks,
  createTask,
  createTaskStatus,
  deleteTask,
  editTask,
  cloneTask,
  getTask,
  getTaskStatus,
  removeTaskStatus,
} from "../controllers/tasks.controller.js";

const router = express.Router();

// All tasks routes
router.get("/", allTasks);
router.post("/", createTask);
router.put("/:taskId", editTask);
router.delete("/:taskId", deleteTask);
router.get("/:taskId", getTask);
router.post("/clone/:taskId", cloneTask);

// Task Statuses
router.get("/task/statuses", getTaskStatus);
router.post("/task/statuses", createTaskStatus);
router.delete("/task/statuses/:statusId", removeTaskStatus);
export default router;
