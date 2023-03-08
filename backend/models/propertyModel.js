const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    propertyName: {
      type: String,
      required: true,
    },
    propertyType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "propertyType",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    configuration: {
      type: [String],
      required: true,
    },
    rentalPrice: {
      type: Number,
      required: true,
    },
    images: [
      {
        url: String,
        filename: String,
      },
    ],
    availableFrom: {
      type: Date,
      required: true,
    },
    availableFor: {
      type: Number,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postedOn: {
      type: Date,
      default: Date.now,
    },
    area: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);
