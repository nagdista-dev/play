import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    mongoose.connection.on("connected", () => {
      console.log(`DB connected Successfully`);
    });
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
