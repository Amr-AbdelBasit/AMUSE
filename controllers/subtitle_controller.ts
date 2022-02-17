export {};
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Subtitle = require("../models/subtitle");

module.exports = {
  async upload(req: any, res: any) {
    const subtitleStorage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, "public/subtitles");
      },

      filename: function (req: any, file: any, cb: any) {
        cb(null, `${Date.now()}_${file.originalname}`);
      },
    });

    const uploadSubtitle = multer({ storage: subtitleStorage }).single(
      "subtitle"
    );
    uploadSubtitle(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        res.json({ success: false, err });
      } else if (err) {
        console.log(err);
        res.json({ success: false, err });
      } else {
        res.status = 200;
        res.setHeader("Content-Type", "application/json");

        res.json({
          success: true,
          filePath: req.file.path,
          fileName: req.file.filename,
        });
      }
    });
  },

  async add(req: any, res: any, next: any) {
    Subtitle.create(req.body)
      .then((subtitle: any) => res.status(201).send(subtitle))
      .catch(next);
  },

  //   async getById(req: any, res: any, next: any) {
  //     Subtitle.findById({ _id: req.query.id })
  //       .then((subtitle: any) => res.status(200).send(subtitle))
  //       .catch(next);
  //   },
};
