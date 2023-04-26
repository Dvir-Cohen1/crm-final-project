import express from "express";
import { addUser, allUsers, getUserById } from "../controllers/users.controller.js";
const router = express.Router();

router.get("/", allUsers);
router.get("/:id", getUserById);
router.post("/add", addUser);

export default router;
