import express from "express";
import {
  register,
  login,
  isLogin,
  logout,
} from "../controllers/authentication.controller.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/isLogin", isLogin);
router.post("/logout/:userId", logout);

export default router;
