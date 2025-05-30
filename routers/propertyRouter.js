const express = require("express");
const { handleGetProperties, handleCreateProperty, handleGetFilteredProperties } = require("../controllers/propertyController");
 const {verifyAgent, authToken} = require("../middlewares/authMiddleware");

const propertyRouter = express.Router();

propertyRouter.get("/get-properties", handleGetProperties);
propertyRouter.get("/filter", handleGetFilteredProperties);
propertyRouter.post("/create-property", authToken, verifyAgent, handleCreateProperty);


module.exports = propertyRouter;