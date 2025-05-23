const mongoose = require("mongoose");
const {
  signUpService,
  updateProfileService,
  updateRoleService,
} = require("../services/authService");

const handleSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await signUpService({ email, password });

    res.status(201).json({
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: error.message,
    });
  }
};

const handleProfileUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, phoneNumber } = req.body;


    const updatedUser = await updateProfileService(id, {
      firstName,
      lastName,
      phoneNumber,
    });

    if (!updatedUser) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

const handleRoleUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const { role } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: "failed",
        message: "Valid user ID is required as param",
      });
    }

    if (!role) {
      return res.status(400).json({
        status: "failed",
        message: "Fill required field",
      });
    }

    const updatedUser = await updateRoleService(id, { role });

    if (!updatedUser) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = { handleSignUp, handleProfileUpdate, handleRoleUpdate };
