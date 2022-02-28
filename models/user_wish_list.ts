export {};
const mongoose = require("mongoose");
const referrenceValidator = require("mongoose-referrence-validator");

const userWishListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "video",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
).index({ userId: 1, videoId: 1 }, { unique: true });

userWishListSchema.plugin(referrenceValidator);

const UserWishListModel = mongoose.model("userWishList", userWishListSchema);

module.exports = UserWishListModel;
