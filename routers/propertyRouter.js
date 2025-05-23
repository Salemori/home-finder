const express = require("express");
const {
  validateSigUp,
  validateProfileUpdate,
  validateMongoId,
} = require("../middlewares/validationMiddleware");
const { verifyAgent, authToken } = require("../middlewares/authMiddleware");
const { handleGetProperties, handleCreateProperty } = require("../controllers/propertyController");

const propertyRouter = express.Router();

propertyRouter.get("/get-properties", handleGetProperties);
propertyRouter.post("/create-property", handleCreateProperty);


module.exports = propertyRouter;