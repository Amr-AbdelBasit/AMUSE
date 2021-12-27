const Gender = require("../models/account/gender");

module.exports = {
  async add(req: any, res: any, next: any) {
    Gender.create(req.body)
      .then((gender: any) => res.status(201).send(gender))
      .catch(next);
  },

  async all(req: any, res: any, next: any) {
    const gendersResponse = new Array();
    Gender.find({ isActive: true }, function (err: any, genders: any) {
      genders.forEach((gender: any) => {
        gendersResponse.push({
          id: gender.id,
          name: gender.name,
        });
      });
    })
      .clone()
      .then(() => res.status(200).send({ genders: gendersResponse }))
      .catch(next);
  },

  async edit(req: any, res: any, next: any) {
    const genderId = req.params.id;
    const genderProps = req.body;
    Gender.findByIdAndUpdate({ _id: genderId }, genderProps)
      .then(() => Gender.findById({ _id: genderId }))
      .then((gender: any) => {
        if (gender == null) {
          // console.log("gender: " + gender);
          res.status(400).send("This gender is not exist!");
        } else {
          res.status(200).send({
            id: gender.id,
            name: gender.name,
            updatedAt: gender.updatedAt,
          });
        }
      })
      .catch(next);
  },

  async delete(req: any, res: any, next: any) {
    const genderId = req.params.id;
    Gender.findByIdAndUpdate({ _id: genderId }, { isActive: false })
      .then((gender: any) => {
        if (gender == null) {
          // console.log("gender: " + gender);
          res.status(400).send("This gender is not exist!");
        } else {
          res.status(200).send("Deleted successfully!");
        }
      })
      .catch(next);
  },
};
