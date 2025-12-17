import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/mongo.js";
import userRouter from "./routes/user.route.js";
// !Start Building
await connectDB();
// !Variables
const app = express();
const port = process.env.PORT || 3001;
// !Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

// !Test API
app.get("/", (_, res) => {
  res.send("EDU-SWAP API");
});
// !User Router
app.use("/api/user", userRouter);
// !Listen
app.listen(port, () => {
  console.log(`Server Starting On: ${port}`);
});
