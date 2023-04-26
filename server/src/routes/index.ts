import express from "express";
import authRoute from "./authentication.route.js";
import usersRoute from "./users.route.js";
import { formatUptime } from "../utils/dates.utils.js";
import catchAsyncError from "../errors/catchAsyncError.js";
import authJwtTokenVerify from "../middlewares/authentication.middleware.js";
const router = express.Router();


router.get("/", (req, res) => {
     res
       .status(200)
       .json({ message: `Server Running ${formatUptime(process.uptime())}` });
   });
router.use("/auth", authRoute);
router.use("/users", authJwtTokenVerify, catchAsyncError(usersRoute));

export default router;
