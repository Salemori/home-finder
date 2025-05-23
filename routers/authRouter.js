const express = require("express");
const {handleSignUp, handleProfileUpdate, handleRoleUpdate, handleLogin, handleLogout, handleRefreshToken} = require("../controllers/authController");
const {validateSigUp, validateProfileUpdate, validateMongoId} = require("../middlewares/validationMiddleware");
const { verifyAgent, authToken} = require("../middlewares/authMiddleware");

const authRouter = express.Router();

authRouter.post("/sign-up", validateSigUp, handleSignUp);
authRouter.put("/update-profile/:id",validateMongoId, validateProfileUpdate, handleProfileUpdate);
authRouter.patch("/update-role/:id", validateMongoId, handleRoleUpdate);
authRouter.post("/login", handleLogin);
authRouter.post("/refresh-token", authToken, validateMongoId, handleRefreshToken);
authRouter.post("/logout", authToken, validateMongoId, handleLogout);



module.exports = authRouter;