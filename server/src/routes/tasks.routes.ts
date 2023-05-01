import express from "express";
import {
  allTasks,
  createTask,
  deleteTask,
  editTask,
  getTask,
} from "../controllers/tasks.controller.js";

const router = express.Router();

// All tasks routes
router.get("/", allTasks);
router.post("/", createTask);
router.put("/:taskId", editTask);
router.delete("/:taskId", deleteTask);
router.get("/:taskId", getTask);

export default router;
