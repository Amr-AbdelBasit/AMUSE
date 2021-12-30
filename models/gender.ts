const _mongoose = require("mongoose");
const genderSchema = new _mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GenderModel = _mongoose.model("gender", genderSchema);

module.exports = GenderModel;
