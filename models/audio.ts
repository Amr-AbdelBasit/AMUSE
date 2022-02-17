export {};
const mongoose = require("mongoose");
const mongooseIntl = require("mongoose-intl");

const audioSchema = new mongoose.Schema(
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

audioSchema.plugin(mongooseIntl, {
  languages: ["ar", "en"],
  defaultLanguage: "en",
});

const audioModel = mongoose.model("audio", audioSchema);

module.exports = audioModel;
