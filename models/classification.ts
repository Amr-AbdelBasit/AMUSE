export {};
const mongoose = require("mongoose");
const mongooseIntl = require("mongoose-intl");

const classificationSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

classificationSchema.plugin(mongooseIntl, {
  languages: ["ar", "en"],
  defaultLanguage: "en",
});

const classificationModel = mongoose.model(
  "classification",
  classificationSchema
);

module.exports = classificationModel;
