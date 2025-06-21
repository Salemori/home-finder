const express = require("express");
const connectDB = require("./config/db");
const authRouter = require("./routers/authRouter");
const propertyRouter = require("./routers/propertyRouter");
const savedPropertyRouter = require("./routers/savedPropertyRouter");
require("dotenv").config();



const app = express();
connectDB();

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/property", propertyRouter);
app.use("/api/v1/save-property", savedPropertyRouter);

const port = process.env.PORT || "8000";
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

app.get("/", (req, res)=>{
    return res.json({message: "Welcome to Home Finder Server"});
});