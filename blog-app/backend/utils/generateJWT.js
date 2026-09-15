const jwt = require("jsonwebtoken");

const generateJWT = (payload) => {
  const token = jwt.sign(payload, "43434343");
  return token;
};

const verifyToken = async (payload) => {
  try {
    const isValid = await jwt.verify(token, "43434343");
    return isValid;
  } catch (error) {
    return res.status(400).send({
      messgae: error.messgae,
    });
  }
};
module.exports = { generateJWT, verifyToken };
