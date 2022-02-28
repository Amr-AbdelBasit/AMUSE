export {};
const mongoose = require("mongoose");
const mongooseIntl = require("mongoose-intl");

require("./user");
require("./avatar");

const userAccountSchema = new mongoose.Schema(
  {
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
    avatarId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "avatar",
    },
    isParent: {
      type: Boolean,
      required: true,
      default: false,
    },
    imgPath: {
      type: String,
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

userAccountSchema.plugin(mongooseIntl, {
  languages: ["ar", "en"],
  defaultLanguage: "en",
});

const UserAccountModel = mongoose.model("userAccount", userAccountSchema);

module.exports = UserAccountModel;
