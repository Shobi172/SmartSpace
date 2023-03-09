const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const secret = "test";

const signup = async (req, res) => {
  const { email, password, name, phone } = req.body;

  try {
    const olduser = await User.findOne({ email });

    if (olduser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedpassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedpassword,
      name,
      phone,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    if (oldUser.blocked) {
      return res.status(403).json({ msg: "Your account has been blocked" });
    }

    const correctPassword = await bcrypt.compare(password, oldUser.password);

    if (!correctPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const search = async (req, res) => {
  const location = req.query.location || "";
  const propertyType = req.query.propertyType || "";
  const priceRange = req.query.priceRange || "";

  try {
    const properties = await Property.find({
      $or: [
        { address: { $regex: location, $options: "i" } },
        { propertyType: { $regex: propertyType, $options: "i" } },
        { rentalPrice: { $regex: priceRange, $options: "i" } },
      ],
    });

    const users = await User.find({ _id: { $in: properties.map((p) => p.postedBy) } });

    res.json({ properties, users });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
}

module.exports = {
  signup,
  signin,
  search
};
