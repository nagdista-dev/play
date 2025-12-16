import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/mongo.js";
import { clerkMiddleware } from "@clerk/express";
import webhookController from "./controllers/webhook.controller.js";
import imageRouter from "./routes/image.route.js";

// !Start Building
await connectDB();
// !Variables
const app = express();
const port = process.env.PORT || 3001;
// !Middlewares
app.use(clerkMiddleware());
app.use(
  cors({
    origin: "https://safe-piexels.vercel.app/api",
    credentials: true, // لو هتبعت cookies أو headers auth
  })
);
app.use(express.json());
// !Test Route
app.get("/", (_, res) => {
  res.json({ message: "Safe Pixels API" });
});
// !Webhook Route
app.post("/api/webhook", webhookController);
// !Image Router
app.use("/api/images", imageRouter);
// !Listing
app.listen(port, () => {
  console.log("Server Listing On :", port);
});
