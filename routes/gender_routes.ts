const GenderController = require("../controllers/genders_controller");

module.exports = (app: any) => {
  app.post("/api/gender", GenderController.add);
  app.get("/api/genders", GenderController.all);
  app.put("/api/gender/edit/:id", GenderController.edit);
  app.delete("/api/gender/delete/:id", GenderController.delete);
};
