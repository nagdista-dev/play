import express from "express";
import {
  login,
  signUp,
  updateProfilePic,
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";
// !Start Building
const userRouter = express.Router();

// !Post
userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post(
  "/update-profile-pic",

upload.single("image")  ,
  updateProfilePic
);
// !Export
export default userRouter;
