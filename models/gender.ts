export {};
const _mongoose = require("mongoose");
const mongooseIntl = require("mongoose-intl");

const genderSchema = new _mongoose.Schema(
  {
    name: {
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

genderSchema.plugin(mongooseIntl, {
  languages: ["ar", "en"],
  defaultLanguage: "en",
});

const GenderModel = _mongoose.model("gender", genderSchema);

module.exports = GenderModel;
