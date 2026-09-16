const express = require("express");
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  loginUser,
} = require("../controllers/userController.js");
const verifyUser = require("../middlewares/auth.js");

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", verifyUser, createUser);
router.post("/users/login", loginUser);
router.get("/users/:id", getUserById);
router.patch("/users/:id", updateUser);

module.exports = router;
