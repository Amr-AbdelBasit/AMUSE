const Gender = require("../models/gender");

module.exports = {
  async add(req: any, res: any, next: any) {
    Gender.create(req.body)
      .then((gender: any) =>
        res.status(201).send({
          isSuccess: true,
          data: {
            id: gender.id,
            arName: gender.get("name.ar"),
            enName: gender.get("name.en"),
          },
        })
      )
      .catch(next);
  },

  async all(req: any, res: any, next: any) {
    const lang = req.query.lang == "ar" ? "ar" : "en";
    const gendersResponse = new Array();
    Gender.find({ isActive: true }, function (err: any, genders: any) {
      genders.forEach((gender: any) => {
        gendersResponse.push({
          id: gender.id,
          name: gender.get(`name.${lang}`),
        });
      });
      res.status(200).send({ isSuccess: true, data: gendersResponse });
    })
      .clone()
      .catch(next);
  },

  async edit(req: any, res: any, next: any) {
    const { genderId } = req.body;
    Gender.findByIdAndUpdate({ _id: genderId }, req.body, { new: true })
      .then((gender: any) => {
        if (gender) {
          res.status(200).send({
            isSuccess: true,
            data: {
              id: gender.id,
              enName: gender.get("name.en"),
              arName: gender.get("name.ar"),
            },
          });
        } else {
          res.status(400).send({
            isSuccess: false,
            err_msg: "This gender is not existing!",
          });
        }
      })
      .catch(next);
  },

  async delete(req: any, res: any, next: any) {
    Gender.findByIdAndUpdate({ _id: req.params.id }, { isActive: false })
      .then((gender: any) => {
        if (gender) {
          res
            .status(200)
            .send({ isSuccess: true, msg: "Deleted successfully!" });
        } else {
          res
            .status(400)
            .send({ isSuccess: false, msg: "This gender is not existing!" });
        }
      })
      .catch(next);
  },
};
