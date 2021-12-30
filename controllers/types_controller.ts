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
          name: type.name,
        });
      });
    })
      .clone()
      .then(() => res.status(200).send({ Types: typesResponse }));
  },
};
