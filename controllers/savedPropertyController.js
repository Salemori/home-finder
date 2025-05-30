const SavedProperty = require("../models/savedPropertyModel");

const handleSaveProperty = async (req, res) => {
  try {
    const { propertyId, userId } = req.body;
    // const userId = req.user._id;

    const isSaved = await SavedProperty.exists({
      user: userId,
      property: propertyId,
    });

    if (isSaved) {
      return res.status(400).json({
        message: "Property already saved",
      });
    }

    const savedProperty = new SavedProperty({
      user: userId,
      property: propertyId,
    });
    await savedProperty.save();

    return res.status(201).json({
      message: "Property saved successfully",
      data: savedProperty,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Property already saved" });
    }
    res.status(500).json({ error: err.message });
  }
};

const handleUnsaveProperty = async (req, res) => {
  try {
    const { propertyId, userId } = req.params;
    // const userId = req.user._id;

    await SavedProperty.findOneAndDelete({
      user: userId,
      property: propertyId,
    });
    res.status(200).json({ message: "Property unsaved" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleGetUserSavedProperties = async (req, res) =>{
   try {
     const {id} = req.params;
    const userSavedProperties = await SavedProperty
      .find({ isActive: true, id});

    res.status(200).json({
      message: "Saved properties retrived successfully",
      data : userSavedProperties
    });
  } catch (error) {
    res.json({
      message: error.message,
   
    });
  }
}


module.exports = {
  handleSaveProperty,
  handleUnsaveProperty,
  handleGetUserSavedProperties
};
