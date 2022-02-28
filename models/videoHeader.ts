export {};
const mongoose = require("mongoose");
const referrenceValidator = require("mongoose-referrence-validator");
require("./genre");
require("./category");
require("./cast");
require("./video");

const videoHeaderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imgPath: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "category",
    },
    genreId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "genre",
    },
    castIds: {
      type: [mongoose.Schema.Types.ObjectId],
      require: true,
      ref: "cast",
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

videoHeaderSchema.plugin(referrenceValidator);

const VideoHeaderModel = mongoose.model("videoHeader", videoHeaderSchema);

module.exports = VideoHeaderModel;
