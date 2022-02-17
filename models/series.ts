export {};
const mongoose = require("mongoose");
const mongooseIntl = require("mongoose-intl");

require("./category");

const seriesSchema = new mongoose.Schema(
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
    imgPath: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "category",
    },
  },
  {
    timestamps: true,
  }
);

seriesSchema.plugin(mongooseIntl, {
  languages: ["ar", "en"],
  defaultLanguage: "en",
});

const SeriesModel = mongoose.model("series", seriesSchema);

module.exports = SeriesModel;
