const userModel = require("../models/userModel.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  const user = await userModel.findById(req.userId).select("-password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  res.json({
    success: true,
    user,
  });
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, blogs } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please enter name",
      });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter email",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please enter password",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      blogs,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      newUser: {
        name: newUser.name,
        email: newUser.name,
        blogs: newUser.blogs,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: { error: error.message, actual: "error during creating user" },
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter email",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please enter password",
      });
    }

    const user = await userModel.findOne({ email });

    await bcrypt.compare(password, user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const privateKey = "something-private-key";
    const token = jwt.sign(
      { email: user.email, name: user.name, id: user._id },
      privateKey,
    );
    return res.status(200).send({
      sucess: true,
      message: "user logged in sucessfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID format",
      });
    }

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {};

module.exports = {
  getUsers,
  createUser,
  loginUser,
  getUserById,
  updateUser,
  getCurrentUser,
};
