import mongoose from "mongoose";

const imageScheme = new mongoose.Schema(
  {
    link: { type: String, required: true },
    owner: { type: String, required: true, ref: "User" },
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageScheme);

export default Image;
