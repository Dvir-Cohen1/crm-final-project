import express from "express";
import authRoute from "./authentication.routes.js";
import usersRoute from "./users.routes.js";
import tasksRoutes from "./tasks.routes.js";
import customersRoutes from "./customers.routes.js";
import { formatUptime } from "../utils/dates.util.js";
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
router.use("/tasks", authJwtTokenVerify, catchAsyncError(tasksRoutes));
router.use("/customers", authJwtTokenVerify, catchAsyncError(customersRoutes));

export default router;
