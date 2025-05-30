const express = require("express");
const { validateMongoId } = require("../middlewares/validationMiddleware");
// const { authToken } = require("../middlewares/authMiddleware");
const {
  handleSaveProperty,
  handleUnsaveProperty,
  handleGetUserSavedProperties
} = require("../controllers/savedPropertyController");

const savedPropertyRouter = express.Router();

savedPropertyRouter.post("/save", handleSaveProperty);
savedPropertyRouter.delete("/unsave/:id", validateMongoId, handleUnsaveProperty);
savedPropertyRouter.get("/user-saved-listing/:id", validateMongoId, handleGetUserSavedProperties);

module.exports = savedPropertyRouter;
