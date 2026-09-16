const privateKey = "something-private-key";
const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    console.log(token);

    if (!token) {
      return res.status(400).send({
        status: false,
        message: "User Login required...",
      });
    }
    const user = await jwt.verify(token, privateKey);
    // console.log("inside auth", user);

    if (!user) {
      return res.status(400).send({
        status: false,
        message: "User Login required...",
      });
    }
    req.user = user.id;
    next();
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
      messageForDev: "error from auth",
    });
  }
};
module.exports = verifyUser;
