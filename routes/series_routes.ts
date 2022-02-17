const SeriesController = require("../controllers/series_controller");

module.exports = (app: any) => {
  app.post("/api/series", SeriesController.add);
  app.get("/api/series/:categoryId", SeriesController.getByCategoryId);
};
