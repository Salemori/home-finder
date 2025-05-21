const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
         required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    role: {
        type: String,
        enum: ["user","agent"],
        default: "user"
    },
    isVerified:{
        type: Boolean
    },
    isActive: {
        type: Boolean
    }
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel; 