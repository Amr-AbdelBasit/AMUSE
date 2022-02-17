export {};
const mongoose = require("mongoose");
const mongooseIntl = require("mongoose-intl");

require("./user");

const userAccountSchema = new mongoose.Schema(
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    isParent: {
      type: Boolean,
      required: true,
      default: false,
    },
    imgPath: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userAccountSchema.plugin(mongooseIntl, {
  languages: ["ar", "en"],
  defaultLanguage: "en",
});

const userAccountModel = mongoose.model("userAccount", userAccountSchema);

module.exports = userAccountModel;
