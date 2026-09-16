const jwt = require("jsonwebtoken");
const privateKey = "something-private-key";
const authMiddleware = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFudXBhbXk1NzFAZ21haWwuY29tIiwibmFtZSI6IkFudXBhbSBZYWRhdiIsImlkIjoiNmFhYTA2ZTFlYWExMmY2MjE5ODY0MDhmIiwiaWF0IjoxNzg5NTc2NTUzfQ.KmaCEkECAJkrGhdKhVcEwOVWYt-j6-QVz4Z2u782XnE";
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }
  try {
    const decoded = jwt.verify(token, privateKey);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
