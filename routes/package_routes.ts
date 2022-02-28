const PackageController = require("../controllers/package_controller");

module.exports = (app: any) => {
  app.post("/api/package", PackageController.add);
  app.get("/api/packages", PackageController.all);
  app.put("/api/package/edit/:id", PackageController.edit);
  app.delete("/api/package/delete/:id", PackageController.delete);
};
