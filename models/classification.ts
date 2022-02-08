export {};
const mongoose = require("mongoose");

const classificationSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const classificationModel = mongoose.model(
  "classification",
  classificationSchema
);

module.exports = classificationModel;
