export {};
const multer = require("multer");
const Cast = require("../models/cast");

module.exports = {
  async add(req: any, res: any, next: any) {
    Cast.create(req.body)
      .then((cast: any) => res.status(201).send(cast))
      .catch(next);
  },
};
