const Property = require("../models/propertyModel");

const handleGetProperties = async (req, res) => {
  try {
    let properties = await Property.find({ isActive: true });
    console.log(properties);

    res.status(200).json({
      message: "Properties retrived",
      data: properties,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};


const handleCreateProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      propertyType,
      purchaseType,
      price,
      images,
      location,
      details,
      owner
    } = req.body;

    const property = new Property({
      title,
      description,
      propertyType,
      purchaseType,
      price,
      images,
      location:{
        address: location.address,
        city: location.city,
        state: location.state
      },
      details:{
        bedrooms: details.bedrooms,
        bathrooms: details.bathrooms,
        toilets: details.toilets
      },
      owner
    });
    await property.save();

    res.status(201).json({
      message: "property created successfully",
      data: property
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


const handleGetFilteredProperties = async (req, res) => {
  try {
    const {
      city,
      state,
      propertyType,
      purchaseType,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      toilets,
      status,
    } = req.query;

    const filters = {
      isActive: true 
    };

    if (city) filters['location.city'] = new RegExp(city, 'i');
    if (state) filters['location.state'] = new RegExp(state, 'i');
    if (propertyType) filters.propertyType = propertyType;
    if (purchaseType) filters.purchaseType = purchaseType;
    if (status) filters.status = status;
    if (bedrooms) filters['details.bedrooms'] = { $gte: parseInt(bedrooms) };
    if (bathrooms) filters['details.bathrooms'] = { $gte: parseInt(bathrooms) };
    if (toilets) filters['details.toilets'] = { $gte: parseInt(toilets) };

    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = parseFloat(minPrice);
      if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
    }

    const properties = await Property.find(filters).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const handleGetpropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await property.findById(id);

    if (!property || !property.isActive) {
      return res.status(404).json({
        message: "property not found",
      });
    }

    res.status(200).json({
      property,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
};

const handleGetPropertyByOwner = async (req, res) => {
  try {
    const propertiesByUser = await property
      .find({ isActive: true })
      .populate("owner");

    res.status(200).json({
      message: "property retrived successfully",
      propertiesByUser,
    });
  } catch (error) {
    res.json({
      message: error.message,
      propertiesByUser,
    });
  }
};

const handleUpdateproperty = async (req, res) => {
  try {
    const { id } = req.params;

    const updateBody = req.body;

    const property = await property.findByIdAndUpdate(id, updateBody, {
      new: true,
      runValidators: true,
    });

    if (!property) {
      console.log(property);
      return res.status(404).json({
        message: "property not found",
      });
    }

    res.status(200).json({
      message: "property updated successfully",
      data: property
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

const handleDeleteproperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await property.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!property) {
      console.log(property);
      return res.status(404).json({
        message: "property not found",
      });
    }

    res.status(200).json({
      message: "property deleted successfully",
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

const handlePermanentDeleteproperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await property.findByIdAndDelete(id);
    if (!property) {
      return res.status(404).json({
        message: "property not found",
      });
    }

    res.status(200).json({
      message: "Property permanent delete successful",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  handleGetProperties,
  handleCreateProperty,
  handleGetpropertyById,
  handleGetPropertyByOwner,
  handleUpdateproperty,
  handleDeleteproperty,
  handlePermanentDeleteproperty,
  handleGetFilteredProperties
};
