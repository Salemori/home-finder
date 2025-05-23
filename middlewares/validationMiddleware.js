const mongoose = require("mongoose");
// const Auth = require("../models/authModel");

const validateSigUp = (req, res, next) => {
  const { email, password } = req.body;

  const errors = [];

  if (!email) {
    errors.push("Email is required");
  }

  if (!password) {
    errors.push("Password is reqired");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }

  next();
};

const validateProfileUpdate = (req, res, next) => {
  const { firstName, lastName, phoneNumber } = req.body;

  const errors = [];

  if (!firstName) {
    errors.push("Email is required");
  }

  if (!lastName) {
    errors.push("Password is reqired");
  }

  if (!phoneNumber) {
    errors.push("Phone number is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }

  next();
};

const validateMongoId = (req, res, next) => {
  const id = req.params.id || req.body.id;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid MongoDB ID" });
  }

  next();
};



module.exports = {
  validateSigUp,
  validateProfileUpdate,
  validateMongoId
};
