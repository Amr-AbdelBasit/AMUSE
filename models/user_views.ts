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
    viewsCount: {
      type: Number,
      require: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
).index({ userId: 1, videoId: 1 }, { unique: true });

userViewsSchema.plugin(referrenceValidator);

const UserViewsModel = mongoose.model("userViews", userViewsSchema);

module.exports = UserViewsModel;
