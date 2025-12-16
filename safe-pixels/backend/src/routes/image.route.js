import express from "express";
import { getAllImages, uploadImag } from "../controllers/image.controller.js";
import upload from "../middlewares/muter.middleware.js";
import protect from "../middlewares/protect.middleware.js";
// !Start Building
const imageRouter = express.Router();
// !GET
imageRouter.get("/all", getAllImages);
// !POST
imageRouter.post("/upload", upload.single("image"), protect, uploadImag);
export default imageRouter;
