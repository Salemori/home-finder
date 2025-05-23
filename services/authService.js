const Auth = require("../models/authModel");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoten");

const signUpService = async (userDetails) => {
  const userExist = await Auth.findOne({ email: userDetails.email });

  if (userExist) {
    throw new Error("User already registered");
  }

  let saltRound = 12;
  let hashedPassword = await bcrypt.hash(userDetails.password, saltRound);

  const user = new Auth({
    email: userDetails.email,
    password: hashedPassword,
  });

  await user.save();

  return user;
};



const updateProfileService = async (id, userDetails) => {
  const user = await Auth.findByIdAndUpdate(id, userDetails, {
    new: true,
    runValidators: true,
  });

  return user;
};

const updateRoleService = async (id, userDetails) => {

  const user = await Auth.findByIdAndUpdate(id, userDetails, {
    new: true,
    runValidators: true,
  });

  return user;
};

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

module.exports = { signUpService, updateProfileService, updateRoleService };
