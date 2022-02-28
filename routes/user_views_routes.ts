const UserViewsController = require("../controllers/user_views_controller");
const Auth = require("../middleware/auth");

module.exports = (app: any) => {
  app.post("/api/user_views/:videoId", Auth, UserViewsController.add);
  app.get("/api/user_views", Auth, UserViewsController.all);
};
