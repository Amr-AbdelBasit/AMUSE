const UserWishListController = require("../controllers/user_wish_list_controller");

module.exports = (app: any) => {
  app.post("/api/user_wish_list", UserWishListController.add);
  app.get("/api/user_wish_list/:userId", UserWishListController.all);
};
