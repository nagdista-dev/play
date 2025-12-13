// import mongoose from "mongoose";

// const connectDB = async (req, res) => {
//   try {
//     mongoose.connection.on("connected", () => {
//       console.log(`DB connected Successfully`);
//     });
//     await mongoose.connect(process.env.MONGO_URI);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export default connectDB;
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    await mongoose.connect(process.env.MONGO_URI);

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
