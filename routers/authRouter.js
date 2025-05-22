const express = require("express");
const {handleSignUp} = require("../controllers/authController");


const authRouter = express.Router();

authRouter.post("/sign-up", handleSignUp);



module.exports = authRouter;