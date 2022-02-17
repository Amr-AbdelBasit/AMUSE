export {};
const Series = require("../models/series");

module.exports = {
  async add(req: any, res: any, next: any) {
    Series.create(req.body)
      .then((series: any) => res.status(201).send(series))
      .catch(next);
  },

  async getByCategoryId(req: any, res: any, next: any) {
    const seriesesResponse = new Array();
    Series.find(
      { isActive: true, categoryId: req.params.categoryId },
      function (err: any, serieses: any) {
        serieses.forEach((series: any) => {
          seriesesResponse.push({
            id: series.id,
            img: series.imgPath,
            enName: series.get("name.en"),
            arName: series.get("name.ar"),
          });
        });
      }
    )
      .clone()
      .then(() => res.status(200).send(seriesesResponse))
      .catch(next);
  },
};
