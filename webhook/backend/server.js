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
const port = process.env.PORT || 3001;

app.post('/api/webhook',webhookController)
app.get("/",(_,res)=>{
    res.send("WEBHOOK API WORKING")
})
app.listen(port, () => {
  console.log(port);
});
