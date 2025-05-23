const jwt = require("jsonwebtoken");
const Auth = require("../models/authModel");


const authToken = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please refresh" });
    }
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

const verifyAgent = async (req, res, next) => {
  // const id = req.params.id || req.body.id;
  const id = req.user.id;

  const user = await Auth.findById(id);

  if (!user || user.role !== "agent") {
    return res
      .status(401)
      .json({ message: "Unauthorized, user is not a agent" });
  }

  req.user = user;
  next();
};

module.exports = {
  authToken,
  verifyAgent,
};
