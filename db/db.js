const mongoose = require("mongoose");

const connectDB = async () =>{
    console.log("Connecting to DataBase...");
    await mongoose.connect("mongodb+srv://aduragbemioduntan:admin@cluster0.vx8ik.mongodb.net/home_finder?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Database Connected");
}

module.exports =connectDB;