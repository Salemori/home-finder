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
        media:{
            images: [String],
            video: String
        },
        status:{
            type: String,
            enum: ["available", "sold", "rented"],
            default: "available"
        },
          location: {
            address: String,
            city: String,
            state: String,
        },
          details: {
            bedrooms: Number,
            bathrooms: Number,
            toilets: Number,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
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

const Property = mongoose.model("Property");

module.exports = Property