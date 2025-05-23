const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: [10, "Password must be at least 10 characters long"],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phoneNumber: {
      type: String,
       match: [/^\d{10,15}$/, "Please enter a valid phone number"],
    },
    role: {
      type: String,
      enum: ["user", "agent", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
    },
    isActive: {
      type: Boolean,
      default: true
    },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  }
);

const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;
