export {};
const mongoose = require("mongoose");
const referrenceValidator = require("mongoose-referrence-validator");
require("./category");
require("./subtitle");
require("./audio");
require("./cast");
require("./series_number");
require("./videoHeader");
require("./season");

const videoSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imgPath: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    quality: {
      type: String,
      required: true,
    },
    yearOfProduction: {
      type: Number,
      required: true,
    },
    publishTime: {
      type: String,
      required: true,
    },
    videoHeaderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "videoHeader",
    },
    isSeries: {
      type: Boolean,
      default: false,
    },
    seriesNoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seriesNumber",
    },
    seasonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "season",
    },
    subtitleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "subtitle",
    },
    audioId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "audio",
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

videoSchema.plugin(referrenceValidator);

const VideoModel = mongoose.model("video", videoSchema);

module.exports = VideoModel;
