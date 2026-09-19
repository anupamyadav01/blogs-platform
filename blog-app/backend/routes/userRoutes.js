const express = require("express");
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/userController.js");
const verifyUser = require("../middlewares/auth.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.post("/users/login", loginUser);
router.get("/users/:id", getUserById);
router.get("/me", authMiddleware, getCurrentUser);
router.patch("/users/:id", updateUser);

module.exports = router;
