const UsersController = require("../controllers/users_controller");

module.exports = (app: any) => {
  app.post("/api/register", UsersController.register);
  app.post("/api/login", UsersController.login);
  app.get("/api/users", UsersController.all);
  app.put("/api/user/edit/:id", UsersController.edit);
  app.delete("/api/user/delete/:id", UsersController.delete);
};
