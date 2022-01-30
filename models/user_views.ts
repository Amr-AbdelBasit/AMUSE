export {};
const mongoose = require("mongoose");
const referrenceValidator = require("mongoose-referrence-validator");

const userViewsSchema = new mongoose.Schema(
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
    viewsCountd: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
).index({ userId: 1, videoId: 1 }, { unique: true });

userViewsSchema.plugin(referrenceValidator);

const userViewsModel = mongoose.model("userViews", userViewsSchema);

module.exports = userViewsModel;
