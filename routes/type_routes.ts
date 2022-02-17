const TypeController = require("../controllers/types_controller");

module.exports = (app: any) => {
  app.post("/api/type", TypeController.add);
  app.get("/api/types", TypeController.all);
  app.delete("/api/type/delete/:id", TypeController.delete);
};
