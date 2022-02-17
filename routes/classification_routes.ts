const ClassificationController = require("../controllers/classifications_controller");

module.exports = (app: any) => {
  app.post("/api/classification", ClassificationController.add);
  app.get("/api/classifications", ClassificationController.all);
  app.delete("/api/classification/delete/:id", ClassificationController.delete);
};
