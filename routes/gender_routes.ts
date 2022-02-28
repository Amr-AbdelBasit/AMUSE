export {};
const GenderController = require("../controllers/gender_controller");
const Auth = require("../middleware/auth");

module.exports = (app: any) => {
  app.post("/api/gender", Auth, GenderController.add);
  app.get("/api/genders", GenderController.all);
  app.put("/api/gender/edit", Auth, GenderController.edit);
  app.delete("/api/gender/delete/:id", Auth, GenderController.delete);
};
