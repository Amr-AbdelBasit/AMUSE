const VideoController = require("../controllers/video_controller");

module.exports = (app: any) => {
  app.post("/api/video/upload", VideoController.upload);
  app.get("/api/video/:fileName", VideoController.get);
};
