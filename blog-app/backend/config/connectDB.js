const mongoose = require("mongoose");
async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/blog_app");
    console.log("DB connected...");
  } catch (error) {
    console.error("MONGO connection error:", error);
  }
}

module.exports = connectDB;
