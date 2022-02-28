export {};
import { ObjectId } from "mongodb";
const Video = require("../models/video");
const VideoHeader = require("../models/videoHeader");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// const debug = false;
// const videoEncoder = "h264"; // mpeg4 libvpx
// const input = "input.mp4";
// const output = "output.mp4";

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

  // async getByName(req: any, res: any) {
  //   const range = req.headers.range;
  //   if (!range) {
  //     res.status(400).send("Requires Range header");
  //   }

  //   // get video stats (about 61MB)
  //   // const query = url.parse(req.url, true).query;
  //   const fileName = req.query.fileName;
  //   // console.log(fileName);
  //   const videoPath = path.resolve("public/videos", fileName);

  //   const videoSize = fs.statSync(videoPath).size;

  //   // Parse Range
  //   // Example: "bytes=32324-"
  //   const CHUNK_SIZE = 10 ** 6; // 1MB
  //   const start = Number(range.replace(/\D/g, ""));
  //   const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  //   // Create headers
  //   const contentLength = end - start + 1;
  //   const headers = {
  //     "Content-Range": `bytes ${start}-${end}/${videoSize}`,
  //     "Accept-Ranges": "bytes",
  //     "Content-Length": contentLength,
  //     "Content-Type": "video/mp4",
  //   };

  //   // HTTP Status 206 for Partial Content
  //   res.writeHead(206, headers);

  //   // create video read stream for this particular chunk
  //   const videoStream = fs.createReadStream(videoPath, { start, end });

  //   // Stream the video chunk to the client
  //   videoStream.pipe(res);
  // },

  async getByName(req: any, res: any) {
    const range = req.headers.range;
    if (!range) {
      res.status(400).send({ isSuccess: false, msg: "Requires Range header" });
    }

    // get video stats (about 61MB)
    // const query = url.parse(req.url, true).query;
    const fileName = req.query.fileName;
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
      .then((video: any) =>
        res.status(201).send({ isSuccess: true, data: video })
      )
      .catch(next);
  },

  async addVideoHeader(req: any, res: any, next: any) {
    VideoHeader.create(req.body)
      .then((video: any) =>
        res.status(201).send({ isSuccess: true, data: video })
      )
      .catch(next);
  },

  async getByHeaderId(req: any, res: any, next: any) {
    const videoHeaderId = req.params.id;
    const lang = req.query.lang == "ar" ? "ar" : "en";
    let videos = await VideoHeader.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "genres",
          localField: "genreId",
          foreignField: "_id",
          as: "genre",
        },
      },
      {
        $lookup: {
          from: "casts",
          localField: "castIds",
          foreignField: "_id",
          as: "casts",
        },
      },
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "videoHeaderId",
          as: "videos",
        },
      },
      { $match: { _id: new ObjectId(videoHeaderId) } },
      { $unwind: "$category" },
      { $unwind: "$genre" },
      {
        $project: {
          _id: 1,
          title: 1,
          imgPath: 1,
          category: `$category.name.${lang}`,
          genre: `$genre.name.${lang}`,
          videos: {
            $map: {
              input: "$videos",
              as: "video",
              in: {
                id: "$$video._id",
                path: "$$video.path",
                title: "$$video.name",
                imgPath: "$$video.imgPath",
                description: "$$video.description",
                duration: "$$video.duration",
                quality: "$$video.quality",
                yearOfProduction: "$$video.yearOfProduction",
                subtitle: `$$video.subtitleId.language.${lang}`,
                audio: `$$video.audioId.language.${lang}`,
              },
            },
          },
          casts: {
            $map: {
              input: "$casts",
              as: "cast",
              in: {
                id: "$$cast._id",
                name: `$$cast.name.${lang}`,
                imgPath: "$$cast.imgPath",
              },
            },
          },
        },
      },
    ]);

    res.status(200).send({ isSuccess: true, data: videos });
  },

  async getAllWithCategories(req: any, res: any, next: any) {
    const lang = req.query.lang == "ar" ? "ar" : "en";
    let videos = await VideoHeader.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "genres",
          localField: "genreId",
          foreignField: "_id",
          as: "genre",
        },
      },
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "videoHeaderId",
          as: "videos",
        },
      },
      { $sort: { createdAt: -1 } },
      { $unwind: "$category" },
      { $unwind: "$genre" },
      {
        $project: {
          _id: 0,
          category: `$category.name.${lang}`,
          videoId: "$_id",
          name: 1,
          imgPath: 1,
          genre: `$genre.name.${lang}`,
          duration: {
            $sum: "$videos.duration",
          },
        },
      },
    ]);

    res.status(200).send({ isSuccess: true, data: videos });
  },
  
  async getByCategoryId(req: any, res: any, next: any) {
    const categoryId = req.params.id;
    const lang = req.query.lang == "ar" ? "ar" : "en";
    let videos = await VideoHeader.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "genres",
          localField: "genreId",
          foreignField: "_id",
          as: "genre",
        },
      },
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "videoHeaderId",
          as: "videos",
        },
      },
      { $match: { categoryId: new ObjectId(categoryId) } },
      { $sort: { createdAt: -1 } },
      { $limit: 4 },
      { $unwind: "$category" },
      { $unwind: "$genre" },
      {
        $project: {
          _id: 0,
          category: `$category.name.${lang}`,
          videoId: "$_id",
          name: 1,
          imgPath: 1,
          genre: `$genre.name.${lang}`,
          duration: {
            $sum: "$videos.duration",
          },
        },
      },
    ]);

    res.status(200).send({ isSuccess: true, data: videos });
  },

  async searchByName(req: any, res: any, next: any) {
    const searchName = req.params.name;
    try {
      const videos = await Video.aggregate([
        {
          $match: {
            $and: [{ name: { $gte: searchName } }, { isActive: true }],
          },
        },
        { $sort: { createdAt: -1 } },
        // { $skip: 5 * req.query.index},
        // { $limit: 5 },
      ]);

      res.status(200).send({ isSuccess: true, data: videos });
      // return specific props based on bussiness
      // look at getById API ...
    } catch (err) {
      res.status(500).send({ isSuccess: false, err: err });
    }
  },

  async uploadImg(req: any, res: any) {
    const imgStorage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, "public/images");
      },

      filename: function (req: any, file: any, cb: any) {
        cb(null, `${Date.now()}_${file.originalname}`);
      },
    });

    const uploadImg = multer({ storage: imgStorage }).single("img");
    uploadImg(req, res, (err: any) => {
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

  async delete(req: any, res: any, next: any) {
    Video.findByIdAndUpdate({ _id: req.params.id }, { isActive: false })
      .then((video: any) => {
        if (video) {
          res
            .status(200)
            .send({ isSuccess: true, msg: "Deleted successfully!" });
        } else {
          res
            .status(400)
            .send({ isSuccess: false, msg: "This video is not existing!" });
        }
      })
      .catch(next);
  },
};
