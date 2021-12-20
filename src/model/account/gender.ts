const mongoose = require("mongoose");
const genderSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const GenderModel = mongoose.model("gender", genderSchema);

module.exports = GenderModel;
