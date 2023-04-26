import express from "express";
import { addUser, allUsers, getUserById,deleteUser } from "../controllers/users.controller.js";
const router = express.Router();

router.get("/", allUsers);
router.get("/:id", getUserById);
router.post("/add", addUser);
router.delete("/:id", deleteUser);

export default router;
