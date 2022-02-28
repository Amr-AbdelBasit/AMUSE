export {};
const UsersController = require("../controllers/user_controller");
const Auth = require("../middleware/auth");

module.exports = (app: any) => {
  app.post("/api/register", UsersController.register);
  app.post("/api/login", UsersController.login);
  app.get("/api/users", UsersController.all);
  app.put("/api/user/edit", Auth, UsersController.edit);
  app.put("/api/userAccount/edit", Auth, UsersController.editUserAccount);
  app.put("/api/user/pinCode", Auth, UsersController.updatePinCode);
  app.put("/api/user/password", Auth, UsersController.updatePassword);
  app.get("/api/user/verifyPinCode/:code", Auth, UsersController.verifyPinCode);
  app.post("/api/user/upload/avatar", Auth, UsersController.uploadAvatar);
  app.get("/api/user/upload/avatars", Auth, UsersController.getAllAvatars);
  app.delete("/api/user/delete/:id", Auth, UsersController.delete);
};
