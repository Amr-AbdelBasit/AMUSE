const Type = require("../models/type");

module.exports = {
  async add(req: any, res: any, next: any) {
    Type.create(req.body)
      .then((type: any) => res.status(201).send(type))
      .catch(next);
  },

  async all(req: any, res: any, next: any) {
    const typesResponse = new Array();
    Type.find({ isActive: true }, function (err: any, types: any) {
      types.forEach((type: any) => {
        typesResponse.push({
          id: type.id,
          EnName: type.get("name.en"),
          ArName: type.get("name.ar"),
          //name: type.name, // By default return the english name
        });
      });
    })
      .clone()
      .then(() => res.status(200).send({ Types: typesResponse }));
  },

  async delete(req: any, res: any, next: any) {
    Type.findByIdAndUpdate({ _id: req.params.id }, { isActive: false })
      .then((type: any) => {
        if (type) {
          res.status(200).send("Deleted successfully!");
        } else {
          res.status(400).send("This type is not exist!");
        }
      })
      .catch(next);
  },
};
