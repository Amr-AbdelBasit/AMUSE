export {};
const Cast = require("../models/cast");

module.exports = {
  async add(req: any, res: any, next: any) {
    Cast.create(req.body)
      .then((cast: any) =>
        res.status(201).send({
          isSuccess: true,
          data: {
            id: cast.id,
            arName: cast.get("name.ar"),
            enName: cast.get("name.en"),
            imgPath: cast.imgPath,
          },
        })
      )
      .catch(next);
  },

  async all(req: any, res: any, next: any) {
    const lang = req.query.lang == "ar" ? "ar" : "en";
    const castsResponse = new Array();
    Cast.find({ isActive: true }, function (err: any, casts: any) {
      casts.forEach((cast: any) => {
        castsResponse.push({
          id: cast.id,
          name: cast.get(`name.${lang}`),
          imgPath: cast.imgPath,
        });
      });
      res.status(200).send({ isSuccess: true, data: castsResponse });
    })
      .clone()
      .catch(next);
  },

  async edit(req: any, res: any, next: any) {
    const castId = req.params.id;
    Cast.findByIdAndUpdate({ _id: castId }, req.body, { new: true })
      .then((cast: any) => {
        if (cast) {
          res.status(200).send({
            isSuccess: true,
            data: {
              id: cast.id,
              name: cast.name,
              imgPath: cast.imgPath,
            },
          });
        } else {
          res.status(400).send({
            isSuccess: false,
            err_msg: "This cast is not existing!",
          });
        }
      })
      .catch(next);
  },

  async delete(req: any, res: any, next: any) {
    Cast.findByIdAndUpdate({ _id: req.params.id }, { isActive: false })
      .then((cast: any) => {
        if (cast) {
          res
            .status(200)
            .send({ isSuccess: true, msg: "Deleted successfully!" });
        } else {
          res
            .status(400)
            .send({ isSuccess: false, msg: "This cast is not existing!" });
        }
      })
      .catch(next);
  },
};
