export {};
const UserWishListController = require("../controllers/user_wish_list_controller");
const Auth = require("../middleware/auth");

module.exports = (app: any) => {
  app.post("/api/user_wish_list/:videoId", Auth, UserWishListController.add);
  app.get("/api/user_wish_list", Auth, UserWishListController.all);
};
