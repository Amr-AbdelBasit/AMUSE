const SubtitleController = require("../controllers/subtitle_controller");

module.exports = (app: any) => {
  app.post("/api/subtitle/upload", SubtitleController.upload);
  app.post("/api/subtitle", SubtitleController.add);
  //   app.get("/api/subtitle/:id", SubtitleController.getById);
};
