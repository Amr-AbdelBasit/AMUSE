const SeriesNumberController = require("../controllers/series_number_controller");

module.exports = (app: any) => {
  app.post("/api/series-number", SeriesNumberController.add);
};
