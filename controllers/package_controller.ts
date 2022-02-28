const Package = require("../models/package");

module.exports = {
  async add(req: any, res: any, next: any) {
    Package.create(req.body)
      .then((pakg: any) =>
        res.status(201).send({ isSuccesss: true, data: pakg })
      )
      .catch(next);
  },

  async all(req: any, res: any, next: any) {
    const packagesResponse = new Array();
    Package.find({ isActive: true }, function (err: any, packages: any) {
      packages.forEach((pakg: any) => {
        packagesResponse.push({
          id: pakg.id,
          name: pakg.name,
          monthlyPrice: pakg.monthlyPrice,
          quality: pakg.quality,
          resolution: pakg.resolution,
          status: pakg.status,
        });
      });
      res.status(200).send({ isSuccess: true, data: packagesResponse });
    })
      .clone()
      .catch(next);
  },

  async edit(req: any, res: any, next: any) {
    const packageId = req.params.id;
    Package.findByIdAndUpdate({ _id: packageId }, req.body, { new: true })
      .then((pakg: any) => {
        if (pakg) {
          res.status(200).send({
            isSuccess: true,
            data: {
              id: pakg.id,
              name: pakg.name,
              monthlyPrice: pakg.monthlyPrice,
              quality: pakg.quality,
              resolution: pakg.resolution,
              status: pakg.status,
            },
          });
        } else {
          res.status(400).send({
            isSuccess: false,
            err_msg: "This package is not existing!",
          });
        }
      })
      .catch(next);
  },

  async delete(req: any, res: any, next: any) {
    const packageId = req.params.id;
    Package.findByIdAndUpdate({ _id: packageId }, { isActive: false })
      .then((pakg: any) => {
        if (pakg) {
          res
            .status(200)
            .send({ isSuccess: true, msg: "Deleted successfully!" });
        } else {
          res
            .status(400)
            .send({ isSuccess: false, msg: "This package is not existing!" });
        }
      })
      .catch(next);
  },
};
