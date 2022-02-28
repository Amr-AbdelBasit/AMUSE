export {};
const mongoose = require("mongoose");
const referrenceValidator = require("mongoose-referrence-validator");
require("./genre");
const mongooseIntl = require("mongoose-intl");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      intl: true,
    },
    genreId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "genre",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
).index({ genreId: 1, name: 1 }, { unique: true });

categorySchema.plugin(mongooseIntl, {
  languages: ["ar", "en"],
  defaultLanguage: "en",
});

categorySchema.plugin(referrenceValidator);

const CategoryModel = mongoose.model("category", categorySchema);

module.exports = CategoryModel;
