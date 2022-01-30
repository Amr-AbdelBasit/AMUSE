const VideoController = require("../controllers/video_controller");

module.exports = (app: any) => {
  app.post("/api/video/upload", VideoController.upload);
  app.post("/api/video/add", VideoController.add);
  app.get("/api/video/:fileName", VideoController.get);
  app.get("/api/video", VideoController.getById);
};
