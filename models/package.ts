export {};
const mongoose = require("mongoose");
// const mongooseIntl = require("mongoose-intl");

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      //   intl: true,
    },
    monthlyPrice: {
      type: String,
      required: true,
    },
    quality: {
      type: String,
      required: true,
    },
    resolution: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// packageSchema.plugin(mongooseIntl, {
//   languages: ["ar", "en"],
//   defaultLanguage: "en",
// });

const PackageModel = mongoose.model("package", packageSchema);

module.exports = PackageModel;
