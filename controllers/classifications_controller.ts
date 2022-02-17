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
            enName: classification.get("name.en"),
            arName: classification.get("name.ar"),
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

  async delete(req: any, res: any, next: any) {
    Classification.findByIdAndUpdate(
      { _id: req.params.id },
      { isActive: false }
    )
      .then((classification: any) => {
        if (classification) {
          res.status(200).send("Deleted successfully!");
        } else {
          res.status(400).send("This gender is not exist!");
        }
      })
      .catch(next);
  },
};
