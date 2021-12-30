export {};
const mongoose = require('mongoose');

const classificationSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      require: true,
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
