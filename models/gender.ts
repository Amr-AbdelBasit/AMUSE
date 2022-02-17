export {};
const _mongoose = require("mongoose");
const mongooseIntl = require("mongoose-intl");

const genderSchema = new _mongoose.Schema(
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

genderSchema.plugin(mongooseIntl, {
  languages: ["ar", "en"],
  defaultLanguage: "en",
});

const GenderModel = _mongoose.model("gender", genderSchema);

module.exports = GenderModel;
