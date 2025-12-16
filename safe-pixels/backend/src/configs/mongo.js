import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/save-pixels`);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log(error.message);
  }
};
export default connectDB;
