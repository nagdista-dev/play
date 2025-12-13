import mongoose from "mongoose";

const userScheme = new mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String },
    email: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userScheme);

export default User;
