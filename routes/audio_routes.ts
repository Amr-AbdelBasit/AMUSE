const AudioController = require("../controllers/audio_controller");

module.exports = (app: any) => {
  app.post("/api/audio/upload", AudioController.upload);
  app.post("/api/audio", AudioController.add);
  //   app.get("/api/audio/:id", AudioController.getById);
};
