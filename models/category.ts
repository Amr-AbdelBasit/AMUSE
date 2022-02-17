export {};
const mongoose = require("mongoose");
const referrenceValidator = require("mongoose-referrence-validator");
require("./type");
const mongooseIntl = require("mongoose-intl");

const categorySchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: true,
      intl: true,
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
).index({ typeId: 1, name: 1 }, { unique: true });

categorySchema.plugin(mongooseIntl, {
  languages: ["ar", "en"],
  defaultLanguage: "en",
});

categorySchema.plugin(referrenceValidator);

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
