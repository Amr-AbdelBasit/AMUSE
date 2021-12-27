const GenderController = require("../controllers/genders_controller");

module.exports = (app: any) => {
  app.post("/api/gender/add", GenderController.add);
  app.get("/api/gender/all", GenderController.all);
  app.put("/api/gender/edit/:id", GenderController.edit);
  app.delete("/api/gender/delete/:id", GenderController.delete);
};
