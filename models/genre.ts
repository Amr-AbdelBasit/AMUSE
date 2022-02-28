const mongoose = require("mongoose");
const mongooseIntl = require("mongoose-intl");

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      intl: true,
    },
    imgPath: {
      type: String,
      required: true,
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

genreSchema.plugin(mongooseIntl, {
  languages: ["ar", "en"],
  defaultLanguage: "en",
});

const GenreModel = mongoose.model("genre", genreSchema);

module.exports = GenreModel;
