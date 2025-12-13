import express from "express";
import "dotenv/config";
import cors from 'cors'
import connectDB from "./db.js";
import webhookController from "./user.controller.js";
// !Start Building
await connectDB();
const app = express();
app.use(cors());
app.use(express.json())
const port = process.env.PORT;

app.post('/api/webhook',webhookController)

app.listen(port, () => {
  console.log(port);
});
