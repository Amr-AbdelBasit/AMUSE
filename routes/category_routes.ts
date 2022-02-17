const CategoryController = require("../controllers/categories_controller");

module.exports = (app: any) => {
  app.post("/api/category", CategoryController.add);
  app.get("/api/categories", CategoryController.all);
  app.delete("/api/category/delete/:id", CategoryController.delete);
};
