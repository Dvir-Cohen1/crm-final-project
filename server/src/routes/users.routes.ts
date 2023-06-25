import express from "express";
import {
  addUser,
  allUsers,
  getUserById,
  deleteUser,
  uploadProfileImage,
  editUser,
  deleteProfileImage,
  pinItem,
  removeAllPinItems,
} from "../controllers/users.controller.js";
import { upload } from "../config/multerConfig.js";
const router = express.Router();

// import multer from "multer";
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/");
//   },
//   filename: function (req, file, cb) {
//     //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.originalname);
//   },
// });

// export const upload = multer({ storage: storage });

router.get("/", allUsers);
router.get("/:id", getUserById);
router.post("/add", addUser);
router.put("/editUser/:id", editUser);
router.delete("/:id", deleteUser);
router.delete("/deleteProfileImage/:id", deleteProfileImage);
router.post(
  "/uploadProfileImage/:userId",
  upload.single("profileImage"),
  uploadProfileImage
);
router.post("/pinItem/:itemId", pinItem);
router.delete("/pinItem/removeAll", removeAllPinItems);

export default router;
