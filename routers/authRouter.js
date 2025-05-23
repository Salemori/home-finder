const express = require("express");
const {handleSignUp, handleProfileUpdate, handleRoleUpdate} = require("../controllers/authController");
const {validateSigUp, validateProfileUpdate, validateMongoId} = require("../middlewares/index")

const authRouter = express.Router();

authRouter.post("/sign-up", validateSigUp, handleSignUp);
authRouter.put("/update-profile/:id",validateMongoId, validateProfileUpdate, handleProfileUpdate);
authRouter.patch("/update-role/:id", validateMongoId, handleRoleUpdate);



module.exports = authRouter;