const Classification = require("../models/classification");

module.exports = {
  async add(req: any, res: any, next: any) {
    Classification.create(req.body)
      .then((c: any) => res.status(201).send(c))
      .catch(next);
  },

  async all(req: any, res: any, next: any) {
    const classificationsResponse = new Array();
    Classification.find(
      { isActive: true },
      function (err: any, classifications: any) {
        classifications.forEach((classification: any) => {
          classificationsResponse.push({
            id: classification.id,
            name: classification.name,
          });
        });
      }
    )
      .clone()
      .then(() =>
        res.status(200).send({ Classifications: classificationsResponse })
      )
      .catch(next);
  },
};
