import express from "express";
import {
  register,
  login,
  isLogin,
  logout,
} from "../controllers/authentication.controller.js";
import authJwtTokenVerify from "../middlewares/authentication.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout/:userId", logout);
router.post("/isLogin", authJwtTokenVerify, isLogin);

export default router;
