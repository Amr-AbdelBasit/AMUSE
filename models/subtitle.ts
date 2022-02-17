export {};
const mongoose = require("mongoose");
const mongooseIntl = require("mongoose-intl");

const subtitleSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    path: {
      type: String,
      required: true,
      intl: true,
    },
  },
  {
    timestamps: true,
  }
);

subtitleSchema.plugin(mongooseIntl, {
  languages: ["ar", "en"],
  defaultLanguage: "en",
});

const subtitleModel = mongoose.model("subtitle", subtitleSchema);

module.exports = subtitleModel;
