const VideoController = require("../controllers/video_controller");
const multer = require("multer");

const videoStorage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "public/videos");
  },

  filename: (req: any, file: any, cb: any) => {
    cb(null, file.originalname);
  },
});

const uploadVideo = multer({ storage: videoStorage });

module.exports = (app: any) => {
  app.post("/videoUpload", uploadVideo.single("video"), VideoController.upload);
  app.get("/video", VideoController.get);
};
