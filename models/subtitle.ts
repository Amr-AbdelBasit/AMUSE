export {};
const mongoose = require("mongoose");
const mongooseIntl = require("mongoose-intl");

const subtitleSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: true,
      intl: true,
    },
    path: {
      type: String,
      required: true,
      intl: true,
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

subtitleSchema.plugin(mongooseIntl, {
  languages: ["ar", "en"],
  defaultLanguage: "en",
});

const SubtitleModel = mongoose.model("subtitle", subtitleSchema);

module.exports = SubtitleModel;
