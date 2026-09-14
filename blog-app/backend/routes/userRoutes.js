const mongoose = require("mongoose");
const express = require("express");
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
} = require("../controllers/userController.js");

const router = express.Router();

router.get("/users", getUsers);

router.post("/users", createUser);

router.get("/users/:id", getUserById);
router.patch("/users/:id", updateUser);

module.exports = router;
