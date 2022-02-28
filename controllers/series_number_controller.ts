const SeriesNumber = require("../models/series_number");

module.exports = {
  async add(req: any, res: any, next: any) {
    SeriesNumber.create(req.body)
      .then((seriesNo: any) => res.status(201).send(seriesNo))
      .catch(next);
  },
};
