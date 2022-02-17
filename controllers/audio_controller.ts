export {};
const multer = require("multer");
const Audio = require("../models/audio");

module.exports = {
  async upload(req: any, res: any) {
    const audioStorage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, "public/audios");
      },

      filename: function (req: any, file: any, cb: any) {
        cb(null, `${Date.now()}_${file.originalname}`);
      },
    });

    const uploadAudio = multer({ storage: audioStorage }).single("audio");
    uploadAudio(req, res, (err: any) => {
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
    Audio.create(req.body)
      .then((audio: any) => res.status(201).send(audio))
      .catch(next);
  },

  //   async getById(req: any, res: any, next: any) {
  //     Audio.findById({ _id: req.query.id })
  //       .then((audio: any) => res.status(200).send(audio))
  //       .catch(next);
  //   },
};
