const mongoose = require("mongoose");
const mongooseIntl = require("mongoose-intl");

const typeSchema = new mongoose.Schema(
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

typeSchema.plugin(mongooseIntl, {
  languages: ["ar", "en"],
  defaultLanguage: "en",
});

const typeModel = mongoose.model("type", typeSchema);

module.exports = typeModel;
