const express = require("express");
const connectDB = require("./db/db");

connectDB();

const app = express();
app.use(express.json());


const PORT = process.env.PORT || "8000";

app.listen(PORT, () => console.log("Server running on port 8000"));

app.get("/", (req, res)=>{
    return res.json({message: "Welcome to Home Finder Server"});
});