import express from "express";
import "dotenv/config";
import cors from "cors";
// !Start Building
const app = express();
const port = process.env.PORT || 3001;
// !Test API
app.get("/", (_, res) => {
  res.send("EDU-SWAP API");
});
// !Listen
app.listen(port, () => {
  console.log(`Server Starting On: ${port}`);
});
