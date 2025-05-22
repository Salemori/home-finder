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

// const signInService = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await UserModel.findOne({ email });

//     if (!user) {
//       return res.status(409).json({
//         status: "failed",
//         message: "User does not exist",
//       });
//     }

//     const passwordEqual = await bcrypt.compare(password, user.password);
//     if (!passwordEqual) {
//       return res.status(401).json({
//         status: "failed",
//         message: "User login failed",
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.SECRET_KEY
//     );
//     res.status(200).json({
//       status: "success",
//       message: "User signed-in successfully",
//       token,
//     });
//   } catch (error) {
//     res.json({
//       status: "failed",
//       message: error.message,
//     });
//   }
// };

// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const updateBody = req.body;

//     const user = await UserModel.findByIdAndUpdate(id, updateBody, {
//       new: true,
//       runValidators: true,
//     });

//     if (!user) {
//       console.log(user);
//       return res.status(404).json({
//         status: "failed",
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       message: "User updated successfully",
//     });
//   } catch (error) {
//     res.json({
//       status: "failed",
//       message: error.message,
//     });
//   }
// };

// const getUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     // console.log(id)
//     console.log(id);
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.send("Invalid ID!");
//     }
//     const user = await UserModel.findById(id);
//     // console.log(user.id)
//     if (!user) {
//       // console.log(user)
//       // return res.send("{user.id}");
//       return res.json({
//         message: "User missing",
//       });
//     }

//     res.json({
//       data: user,
//     });
//   } catch (error) {
//     res.send("Error: " + error.message);
//   }
// };

// const getUsers = async (req, res) => {
//   res.send("Retrieved all users");
// };

// const getMatches = async (req, res) => {
//   try {
//     const currentUser = await User.findById(req.user.id);
//     const matches = await User.find({
//       gender: currentUser.interestedIn,
//       interestedIn: currentUser.gender,
//       _id: { $ne: req.user.id },
//     });

//     res.status(200).json({
//       satus: "success",
//       message: "Matches retrieved successfully",
//       matches,
//     });
//   } catch (error) {
//     res.json({
//       satus: "failed",
//       message: error.message,
//     });
//   }
// };

// const getUsersByHobbies = async (req, res) => {
//   try {
//     const { hobbies } = req.query;

//     if (!hobbies) {
//       return res.status(400).json({
//         status: "failed",
//         message: "Please provide at least one hobby",
//       });
//     }

//     const hobbiesArray = hobbies.split(",").map((hobby) => hobby.trim());

//     const users = await User.find({
//       hobbies: { $in: hobbiesArray },
//       _id: { $ne: req.user.id },
//     }).select("-password");

//     res.status(200).json({
//       status: "success",
//       message: "Users retrieved successfully based on hobbies",
//       users,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "failed",
//       message: error.message,
//     });
//   }
// };

module.exports = { signUpService }