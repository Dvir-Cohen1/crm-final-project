import express from "express";
import {
  addUser,
  allUsers,
  getUserById,
  deleteUser,
  uploadProfileImage,
  editUser,
} from "../controllers/users.controller.js";
const router = express.Router();

import multer from "multer";
// const upload = multer({ dest: "./uploads/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/");
  },
  filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.get("/", allUsers);
router.get("/:id", getUserById);
router.post("/add", addUser);
router.put("/editUser/:id", editUser);
router.delete("/:id", deleteUser);
router.post(
  "/uploadProfileImage/:userId",
  upload.single("profileImage"),
  uploadProfileImage
);

export default router;
