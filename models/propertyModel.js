const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
    {
        title:{
            type: String, 
            require: true
        },
        description:{
            type: String, 
            require: true
        },
        propertyType:{
            type: String, 
            required: true
        },
        purchaseType: {
            type: String,
            enum: ["lease", "sale"],
            required: true
        },
        price:{
            type: String, 
            required: true
        },
        status:{
            type: String,
            enum: ["available", "sold", "rented"],
            required: true
        },
        isActive:{
            type: Boolean
        }
    },
    {
        timestamps: true,
    }
);

const propertyModel = mongoose.model("Property")