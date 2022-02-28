export {};
const mongoose = require("mongoose");
// const mongooseIntl = require("mongoose-intl");

const seasonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      //   intl: true,
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

// seasonSchema.plugin(mongooseIntl, {
//   languages: ["ar", "en"],
//   defaultLanguage: "en",
// });

const SeasonModel = mongoose.model("season", seasonSchema);

module.exports = SeasonModel;
