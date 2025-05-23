const jwt = require("jsonwebtoken");
const Auth = require("../models/authModel");

const authorization = async (req, res, next) => {
  try {
      const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  const splitToken = token.split(" ");

  const realToken = splitToken[1];

  const decoded = jwt.verify(realToken, process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(401).json({ message: "Please login!" });
  }

  const user = await Auth.findById(decoded.id);

  if (!user) {
    return res.status(404).json({ message: "User account does not exist" });
  }

  req.user = user;

  next();
  } catch (error) {
     res.status(401).json({ error: "Invalid Token" });
  }
};


const authToken = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired, please refresh" });
        }
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

const verifyAgent = async (req, res, next) =>{
    const id = req.params.id || req.body.id;

    const user = await Auth.findById(decoded.id);

    if(!user || user.role !== "agent"){
        return res.status(401).json({message: "Unauthorized, user is not a agent"});
    }

    req.user = user;
    next();
}

module.exports = {
authToken,
verifyAgent
};
