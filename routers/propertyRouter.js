const express = require("express");
const { handleGetProperties, handleCreateProperty } = require("../controllers/propertyController");
 const {verifyAgent, authToken} = require("../middlewares/authMiddleware");

const propertyRouter = express.Router();

propertyRouter.get("/get-properties", handleGetProperties);
propertyRouter.post("/create-property", authToken, verifyAgent, handleCreateProperty);


module.exports = propertyRouter;