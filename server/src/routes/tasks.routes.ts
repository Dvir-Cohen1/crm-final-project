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
  uploadAttachments,
} from "../controllers/tasks.controller.js";
import { upload } from "../config/multerConfig.js";
// import multer from "multer";
const router = express.Router();
// const upload = multer({ dest: "uploads/" });
// All tasks routes
router.get("/", allTasks);
router.post("/", createTask);
router.put("/:taskId", editTask);
router.delete("/:taskId", deleteTask);
router.get("/:taskId", getTask);
router.post("/clone/:taskId", cloneTask);
router.post(
  "/task/uploadAttachments/:taskId",
  upload.array("attachments"),
  uploadAttachments
);

// Task Statuses
router.get("/task/statuses", getTaskStatus);
router.post("/task/statuses", createTaskStatus);
router.delete("/task/statuses/:statusId", removeTaskStatus);
export default router;
