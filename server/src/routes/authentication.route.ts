import express from "express";
import {
  register,
  login,
  isLogin,
} from "../controllers/authentication.controller.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/isLogin", isLogin);

export default router;
