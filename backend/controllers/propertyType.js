const PropertyType = require("../models/propertyTypeModel");

const addPropertyType = async (req, res) => {
  const { name } = req.body;
  const propertyType = new PropertyType({ name });
  try {
    const savedPropertyType = await propertyType.save();
    res.status(201).json(savedPropertyType);
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getPropertyType = async (req, res) => {
    try {

        const propertyTypes = await PropertyType.find({},"name");
        res.status(200).json(propertyTypes);
        
    } catch (error) {
        res.status(400).json(error.message);
    }
}



const updatePropertyType = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedPropertyType = await PropertyType.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedPropertyType) {
      return res.status(404).json({ message: "Property type not found" });
    }
    res.status(200).json(updatedPropertyType);
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const deletePropertyType = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPropertyType = await PropertyType.findByIdAndDelete(id);
    if (!deletedPropertyType) {
      return res.status(404).json({ message: "Property type not found" });
    }
    res.status(200).json(deletedPropertyType);
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = {
  addPropertyType,
  updatePropertyType,
    deletePropertyType,
    getPropertyType
};
