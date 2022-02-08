export {};
const mongoose = require("mongoose");
const referrenceValidator = require("mongoose-referrence-validator");
require("./type");

const categorySchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: true,
    },
    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "type",
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.plugin(referrenceValidator);

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
