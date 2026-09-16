const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController.js");
const verifyUser = require("../middlewares/auth.js");

const router = express.Router();

router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.post("/blogs", verifyUser, createBlog);
router.patch("/blogs/:id", verifyUser, updateBlog);
router.delete("/blogs/:id", verifyUser, deleteBlog);

module.exports = router;
