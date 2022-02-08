export {};
const mongoose = require("mongoose");
const referrenceValidator = require("mongoose-referrence-validator");
require("./category");
require("./classification");

const videoSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    path: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "category",
    },
    classificationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "classification",
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.plugin(referrenceValidator);

const videoModel = mongoose.model("video", videoSchema);

module.exports = videoModel;
