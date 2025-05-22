const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phoneNumber: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "agent"],
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

const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth; 