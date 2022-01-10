const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const typeModel = mongoose.model("type", typeSchema);

module.exports = typeModel;
