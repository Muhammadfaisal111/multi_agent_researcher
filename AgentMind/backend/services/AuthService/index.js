import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();
connectDB();


const port = process.env.PORT || 8001;
const app = express();

app.get("/", (req, res) => {
  res.send("AuthService is running");
});

app.listen(port, () => {
  console.log(`AuthService is running on port ${port}`);
  
});
