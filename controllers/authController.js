// const mongoose = require("mongoose");
const Auth = require("../models/authModel");
const bcrypt = require("bcrypt");
// const jwt =("jsonwebtoken");
const {
  signUpService,
  updateProfileService,
  updateRoleService,
} = require("../services/authService");
const { generateTokens } = require("../utils/authUtil");


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

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email && password);

    if (!(email && password)) {
      return res.json({ message: "Field cannot be empty" });
    }

    const user = await Auth.findOne({ email });

    if (!user || user.isVerified == false) {
      return res.status(404).json({ message: "User not found" });
    }

    const isUser = bcrypt.compare(password, user.password);
    console.log(isUser);
    if (!isUser) {
      return res.json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res
      .status(200)
      .json({
        message: "User login successfully",
        accessToken: accessToken,
      });
  } catch (error) {
    res
      .status(400)
      .json({ message: "User login unsuccessful", error: error.message });
  }
};

const handleRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token passed" });
    }

    const decodedToken = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res
      .status(200)
      .json({
        message: "Refresh token retrieved successfully",
        accessToken: accessToken,
      });
  } catch (error) {
    res
      .status(401)
      .json({
        message: "Invalid or expired refresh token",
        error: error.message,
      });
  }
};

const handleLogout = async (req, res) => {
  try {
    const { id } = req.user;
    console.log(req.user);
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.refreshToken = null;
    await user.save();

    res.clearCookie("refreshToken");

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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

module.exports = {
  handleSignUp,
  handleProfileUpdate,
  handleRoleUpdate,
  handleLogin,
  handleRefreshToken,
  handleLogout,
};
