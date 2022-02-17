const VideoController = require("../controllers/video_controller");

module.exports = (app: any) => {
  app.post("/api/video/upload", VideoController.upload);
  app.post("/api/video/add", VideoController.add);
  app.get("/api/video/:fileName", VideoController.get);
  app.get("/api/video", VideoController.getById);
  app.get("/api/video/search/:name", VideoController.searchByName);
  app.get("/api/video/series/:seriesId", VideoController.getBySeriesId);
  app.get("/api/video/category/:categoryId", VideoController.getByCategoryId);
  app.post("/api/img/upload", VideoController.uploadImg);
};
