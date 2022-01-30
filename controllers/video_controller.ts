export {};
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Video = require("../models/video");
const url = require("url");

module.exports = {
  async upload(req: any, res: any) {
    const videoStorage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, "public/videos");
      },

      filename: function (req: any, file: any, cb: any) {
        cb(null, `${Date.now()}_${file.originalname}`);
      },

      fileFilter: function (req: any, file: any, cb: any) {
        const ext = path.extname(file.originalname);
        console.log("extension: " + ext);
        console.log("file: " + file);

        if (ext !== ".mp4") {
          return cb(null, false);
        }
        cb(null, true);
      },
    });

    const uploadVideo = multer({ storage: videoStorage }).single("video");
    uploadVideo(req, res, (err: any) => {
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

  async get(req: any, res: any) {
    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Requires Range header");
    }

    // get video stats (about 61MB)
    // const query = url.parse(req.url, true).query;
    const fileName = req.params.fileName;
    // console.log(fileName);
    const videoPath = path.resolve("public/videos", fileName);

    const videoSize = fs.statSync(videoPath).size;

    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    // Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);
  },

  async add(req: any, res: any, next: any) {
    Video.create(req.body)
      .then((video: any) => res.status(201).send(video))
      .catch(next);
  },

  async getById(req: any, res: any, next: any) {
    Video.findById({ _id: req.query.id })
      .then((video: any) => res.status(200).send(video))
      .catch(next);
  },
};
