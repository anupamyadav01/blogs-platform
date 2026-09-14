const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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
    console.log(existingUser);

    // Create user
    const newUser = await userModel.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    // Handle duplicate email or server errors
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Validate if 'id' is a valid 24-hex-char MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID format",
      });
    }

    // 2. Query a single document
    const user = await userModel.findById({ _id });
    console.log(user);

    // 3. Check if user actually exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 4. Return the user object
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

module.exports = { getUsers, createUser, getUserById, updateUser };
