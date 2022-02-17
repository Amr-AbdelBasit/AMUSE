export {};
const mongoose = require("mongoose");
const referrenceValidator = require("mongoose-referrence-validator");
require("./category");
require("./classification");
require("./subtitle");
require("./audio");
require("./cast");
require("./series");

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
    name: {
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
    yearOfProduction: {
      type: Number,
      required: true,
    },
    seriesNo: {
      type: Number,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    classificationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "classification",
    },
    seriesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "series",
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
    castIds: {
      type: [mongoose.Schema.Types.ObjectId],
      require: true,
      ref: "cast",
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.plugin(referrenceValidator);

const videoModel = mongoose.model("video", videoSchema);

module.exports = videoModel;
