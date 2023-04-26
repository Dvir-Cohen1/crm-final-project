import express from "express";
import { allUsers, getUserById } from "../controllers/users.controller.js";
const router = express.Router();

router.get("/", allUsers);
router.get("/:id", getUserById);

export default router;
