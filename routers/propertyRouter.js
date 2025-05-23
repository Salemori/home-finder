const express = require("express");
const { handleGetProperties, handleCreateProperty } = require("../controllers/propertyController");

const propertyRouter = express.Router();

propertyRouter.get("/get-properties", handleGetProperties);
propertyRouter.post("/create-property", handleCreateProperty);


module.exports = propertyRouter;