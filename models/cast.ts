export {};
const mongoose = require("mongoose");
const mongooseIntl = require("mongoose-intl");

const castSchema = new mongoose.Schema(
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
      unique: true,
    },
  },
  {
    timestamps: true,
  }
).index({ name: 1, imgPath: 1 }, { unique: true });

castSchema.plugin(mongooseIntl, {
  languages: ["ar", "en"],
  defaultLanguage: "en",
});

const castModel = mongoose.model("cast", castSchema);

module.exports = castModel;
