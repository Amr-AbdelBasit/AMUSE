const UserWishListController = require("../controllers/user_wish_list_controller");

module.exports = (app: any) => {
  app.post("/api/user_wish_list", UserWishListController.add);
};
