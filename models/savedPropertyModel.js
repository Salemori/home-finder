// models/SavedProperty.js
const mongoose = require("mongoose");

const savedPropertySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// --> Remenber to prevent duplicate saves (one user, one property)
savedPropertySchema.index({ user: 1, property: 1 }, { unique: true });

const SavedProperty = mongoose.model("SavedProperty", savedPropertySchema);

module.exports = SavedProperty;
