export {};
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      require: true,
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

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
