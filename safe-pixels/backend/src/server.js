import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/mongo.js";
import { clerkMiddleware } from "@clerk/express";
import webhookController from "./controllers/webhook.controller.js";

// !Start Building
await connectDB();
// !Variables
const app = express();
const port = process.env.PORT || 3001;
// !Middlewares
app.use(clerkMiddleware());
app.use(cors());
app.use(express.json());
// !Test Route
app.get("/", (_, res) => {
  res.json({ message: "Safe Pixels API" });
});
// !Webhook Route
app.use("/api/webhook", webhookController);
// !Listing
app.listen(port, () => {
  console.log("Server Listing On :", port);
});
