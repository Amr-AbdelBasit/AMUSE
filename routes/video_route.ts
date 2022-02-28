const VideoController = require("../controllers/video_controller");

module.exports = (app: any) => {
  app.post("/api/video/upload", VideoController.upload);
  app.post("/api/video-header/add", VideoController.addVideoHeader);
  app.get("/api/video-header/:id", VideoController.getByHeaderId);
  app.post("/api/video/add", VideoController.add);
  app.get("/api/video", VideoController.getByName);
  // app.get("/api/video/:id", VideoController.getById);
  app.get("/api/video/search/:name", VideoController.searchByName);
  // app.get("/api/video/series/:id", VideoController.getBySeriesId);
  app.get("/api/video/categories", VideoController.getAllWithCategories);
  app.get("/api/video/category/:id", VideoController.getByCategoryId);
  app.post("/api/img/upload", VideoController.uploadImg);
  app.delete("/api/video/delete/:id", VideoController.delete);
};
