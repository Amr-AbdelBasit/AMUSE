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
      if (err) {
        res.status(422).send({ isSuccess: false, err_msg: err.message });
      } else {
        res.setHeader("Content-Type", "application/json");

        res.status(200).send({
          isSuccess: true,
          data: {
            filePath: req.file.path,
            fileName: req.file.filename,
          },
        });
      }
    });
  },

  async add(req: any, res: any, next: any) {
    Audio.create(req.body)
      .then((audio: any) =>
        res.status(201).send({
          isSuccess: true,
          data: {
            id: audio.id,
            arLanguage: audio.get("language.ar"),
            enLanguage: audio.get("language.en"),
            arPath: audio.get("path.ar"),
            enPath: audio.get("path.en"),
          },
        })
      )
      .catch(next);
  },

  // async getById(req: any, res: any, next: any) {
  //   Audio.findById({ _id: req.params.id })
  //     .then((audio: any) =>
  //       res.status(200).send({
  //         isSuccess: true,
  //         data: {
  //           id: audio.id,
  //           arPath: audio.get("path.ar"),
  //           enPath: audio.get("path.en"),
  //         },
  //       })
  //     )
  //     .catch(next);
  // },
};
