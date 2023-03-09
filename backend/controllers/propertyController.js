const Property = require("../models/propertyModel");
const PropertyType = require("../models/propertyTypeModel");
const User = require("../models/userModel");

const addProperty = async (req, res) => {
  const data = JSON.parse(req.body.data);
  const user = JSON.parse(req.body.user);
  const userId = user._id;

  const {
    propertyName,
    propertyType,
    address,
    street,
    state,
    pincode,
    configuration,
    rentalPrice,
    availableFrom,
    availableFor,
    area,
    description
  } = data;

  try {

    const property = new Property({
      propertyName,
      propertyType,
      address,
      street,
      state,
      pincode,
      configuration,
      rentalPrice,
      availableFrom,
      availableFor,
      postedBy: userId,
      area,
      description,
    });

    property.images = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));

    const savedProperty = await property.save();
    console.log(savedProperty);

    res.status(201).json({savedProperty});
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    Property.aggregate([
      { $lookup: {
          from: 'users',
          localField: 'postedBy',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      { $project: {
          _id: '$userDetails._id',
          userName: '$userDetails.name'
        }
      }
    ], (err, users) => {
      if (err) {
        console.log(err);
      } else {
        console.log(users);
        res.json({properties,users});
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProperty = async (req, res) => {
  const {
    propertyName,
    propertyType,
    address,
    configuration,
    rentalPrice,
    street,
    state,
    pincode,
    availableFrom,
    availableFor,
    area,
    description,
  } = req.body;

  if (req.files.length > 0) {
    const photos = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));
    let product = await Property.updateOne({ _id: id }, { images: photos });
  }

  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      property.propertyName = propertyName;
      property.propertyType = propertyType;
      property.address = address;
      property.street = street;
      property.state = state;
      property.pincode = pincode;
      property.configuration = configuration;
      property.rentalPrice = rentalPrice;
      property.availableFrom = availableFrom;
      property.availableFor = availableFor;
      property.area = area;
      property.description = description;

      const updatedProperty = await property.save();
      res.json(updatedProperty);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      await property.remove();
      res.json({ message: "Property deleted" });
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addProperty,
  getProperties,
  updateProperty,
  deleteProperty,
};
