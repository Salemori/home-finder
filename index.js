const express = require("express");
const connectDB = require("./config/db");
const authRouter = require("./routers/authRouter");
require("dotenv").config();



const app = express();
connectDB();

app.use(express.json());
app.use("/auth", authRouter)

const port = process.env.PORT || "8000";
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

app.get("/", (req, res)=>{
    return res.json({message: "Welcome to Home Finder Server"});
});