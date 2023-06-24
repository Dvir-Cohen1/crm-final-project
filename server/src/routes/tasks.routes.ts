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
  deleteAllAttachments,
  deleteOneAttachment,
} from "../controllers/tasks.controller.js";
import { upload } from "../config/multerConfig.js";

const router = express.Router();

// All tasks routes
router.get("/", allTasks);
router.post("/", createTask);
router.put("/:taskId", editTask);
router.delete("/:taskId", deleteTask);
router.get("/:taskId", getTask);
router.post("/clone/:taskId", cloneTask);

// Tasks Attachments
router.post(
  "/task/uploadAttachments/:taskId",
  upload.array("attachments"),
  uploadAttachments
);
router.delete("/task/deleteAllAttachments/:taskId", deleteAllAttachments);
router.delete("/task/deleteOneAttachment/:taskId/:fileName", deleteOneAttachment);

// Task Statuses
router.get("/task/statuses", getTaskStatus);
router.post("/task/statuses", createTaskStatus);
router.delete("/task/statuses/:statusId", removeTaskStatus);
export default router;
