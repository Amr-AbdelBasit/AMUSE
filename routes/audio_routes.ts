export {};
const AudioController = require("../controllers/audio_controller");
const Auth = require("../middleware/auth");

module.exports = (app: any) => {
  app.post("/api/audio/upload", Auth, AudioController.upload);
  app.post("/api/audio", Auth, AudioController.add);
  //   app.get("/api/audio/:id", AudioController.getById);
};
