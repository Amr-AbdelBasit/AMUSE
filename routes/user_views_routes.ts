const UserViewsController = require("../controllers/user_views_controller");

module.exports = (app: any) => {
  app.post("/api/user_views", UserViewsController.add);
  app.get("/api/user_views/:userId", UserViewsController.all);
};
