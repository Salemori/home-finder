const Auth = require("../models/authModel");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoten");



const signUpService = async (email, password) => {
 try {
    
  if(!email || !password){
    return "Fill all fields";
  }
     const userExist = await Auth.findOne({ email });


  if (userExist) {
    return "User already exist";
  }

  let saltRound = 12;
  let hashedPassword = await bcrypt.hash(password, saltRound);

  const user = new Auth({
    email,
    password: hashedPassword,
  });

  await user.save();

  return user;
 } catch (error) {
    return error.message
 }
};



module.exports = { signUpService }