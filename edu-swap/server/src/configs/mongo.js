import mongoose from "mongoose";

// !Start Building
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/edu-swap`);
    console.log(`DB Connected Successfully`);
  } catch (error) {
    console.log(error.message);
    process.exit(-1)
  }
};
export default connectDB;
