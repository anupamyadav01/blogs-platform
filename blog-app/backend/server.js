const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/connectDB.js");
const userModel = require("./models/userModel.js");
const userRouter = require("./routes/userRoutes.js");
const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000...");
  connectDB();
});
