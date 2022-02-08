export {};
const mongoose = require("mongoose");
const referrenceValidator = require("mongoose-referrence-validator");

const userWishListSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
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
  },
  {
    timestamps: true,
  }
).index({ userId: 1, videoId: 1 }, { unique: true });

userWishListSchema.plugin(referrenceValidator);

const userWishListModel = mongoose.model("userWishList", userWishListSchema);

module.exports = userWishListModel;
