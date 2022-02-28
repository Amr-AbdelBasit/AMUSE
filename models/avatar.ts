export {};
const mongoose = require("mongoose");

const avatarSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
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

const AvatarModel = mongoose.model("avatar", avatarSchema);

module.exports = AvatarModel;
