import express from "express";
import {
  getUser,
  login,
  signUp,
  updateProfilePic,
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";
import protect from "../middlewares/protect.middleware.js";
// !Start Building
const userRouter = express.Router();

// !Post
userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/get-user", protect, getUser);
userRouter.post(
  "/update-profile-pic",

  upload.single("image"),
  protect,
  updateProfilePic
);
// !Export
export default userRouter;
