export {};
const CategoryController = require("../controllers/category_controller");
const Auth = require("../middleware/auth");

module.exports = (app: any) => {
  app.post("/api/category", Auth, CategoryController.add);
  app.get("/api/categories", CategoryController.all);
  app.get("/api/categories/:genreId", CategoryController.getByGenreId);
  app.put("/api/category/edit/:id", Auth, CategoryController.edit);
  app.delete("/api/category/delete/:id", Auth, CategoryController.delete);
};
