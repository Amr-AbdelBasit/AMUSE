export {};
const mongoose = require("mongoose");
// const mongooseIntl = require("mongoose-intl");

const seriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // intl: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// seriesSchema.plugin(mongooseIntl, {
//   languages: ["ar", "en"],
//   defaultLanguage: "en",
// });

const SeriesNumberModel = mongoose.model("seriesNumber", seriesSchema);

module.exports = SeriesNumberModel;
