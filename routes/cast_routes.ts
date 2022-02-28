export {};
const CastController = require("../controllers/cast_controller");
const Auth = require("../middleware/auth");

module.exports = (app: any) => {
  app.post("/api/cast", Auth, CastController.add);
  app.get("/api/casts", Auth, CastController.all);
  app.put("/api/cast/edit/:id", Auth, CastController.edit);
  app.delete("/api/cast/delete/:id", Auth, CastController.delete);
};
