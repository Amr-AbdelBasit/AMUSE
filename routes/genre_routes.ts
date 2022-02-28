export {};
const GenreController = require("../controllers/genre_controller");
const Auth = require("../middleware/auth");

module.exports = (app: any) => {
  app.post("/api/genre", Auth, GenreController.add);
  app.get("/api/genres", GenreController.all);
  app.put("/api/genre/edit/:id", Auth, GenreController.edit);
  app.delete("/api/genre/delete/:id", Auth, GenreController.delete);
};
