export {};
const mongoose = require("mongoose");
const mongooseIntl = require("mongoose-intl");

const audioSchema = new mongoose.Schema(
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

audioSchema.plugin(mongooseIntl, {
  languages: ["ar", "en"],
  defaultLanguage: "en",
});

const AudioModel = mongoose.model("audio", audioSchema);

module.exports = AudioModel;
