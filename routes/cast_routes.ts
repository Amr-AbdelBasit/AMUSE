const CastController = require("../controllers/cast_controller");

module.exports = (app: any) => {
  app.post("/api/cast", CastController.add);
};
