export {};
const UsersController = require("../controllers/users_controller");
const Auth = require("../middleware/auth");

module.exports = (app: any) => {
  app.post("/api/register", UsersController.register);
  app.post("/api/login", UsersController.login);
  app.put("/api/user/edit", Auth, UsersController.edit);
  app.put("/api/userAccount/edit", Auth, UsersController.editUserAccount);
  app.delete("/api/user/delete/:id", Auth, UsersController.delete);
  app.put("/api/user/pinCode", Auth, UsersController.updatePinCode);
};
