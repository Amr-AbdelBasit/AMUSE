export {};
const mongoose = require("mongoose");
const mongooseIntl = require("mongoose-intl");

const castSchema = new mongoose.Schema(
  {
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
    isActive: {
      type: Boolean,
      default: true,
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

const CastModel = mongoose.model("cast", castSchema);

module.exports = CastModel;
