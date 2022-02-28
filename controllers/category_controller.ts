const Category = require("../models/category");

module.exports = {
  async add(req: any, res: any, next: any) {
    Category.create(req.body)
      .then((category: any) =>
        res.status(201).send({
          isSuccess: true,
          data: {
            id: category.id,
            enName: category.get("name.en"),
            arName: category.get("name.ar"),
          },
        })
      )
      .catch(next);
  },

  async all(req: any, res: any, next: any) {
    const lang = req.query.lang == "ar" ? "ar" : "en";
    const categoriesResponse = new Array();
    Category.find({ isActive: true })
      .populate("genreId", { _id: 0, name: 1 })
      .exec((err: any, categories: any) => {
        if (err)
          res.status(422).send({ isSuccess: false, err_msg: err.message });
        categories.forEach((category: any) => {
          categoriesResponse.push({
            id: category.id,
            name: category.get(`name.${lang}`),
            // typeName: category.genreId.get(`name.${lang}`),
          });
        });
        res.status(200).send({ isSuccess: true, data: categoriesResponse });
      });
  },

  async getByGenreId(req: any, res: any, next: any) {
    const lang = req.query.lang == "ar" ? "ar" : "en";
    const genreId = req.params.genreId;
    const categoriesResponse = new Array();
    Category.find(
      { isActive: true, genreId },
      function (err: any, categories: any) {
        categories.forEach((category: any) => {
          categoriesResponse.push({
            id: category.id,
            name: category.get(`name.${lang}`),
          });
        });
        res.status(200).send({ isSuccess: true, data: categoriesResponse });
      }
    )
      .clone()
      .catch(next);
  },

  async edit(req: any, res: any, next: any) {
    const categoryId = req.params.id;
    Category.findByIdAndUpdate({ _id: categoryId }, req.body, { new: true })
      .then((category: any) => {
        if (category) {
          res.status(200).send({
            isSuccess: true,
            data: {
              id: category.id,
              name: category.name,
            },
          });
        } else {
          res.status(400).send({
            isSuccess: false,
            err_msg: "This category is not existing!",
          });
        }
      })
      .catch(next);
  },

  async delete(req: any, res: any, next: any) {
    Category.findByIdAndUpdate({ _id: req.params.id }, { isActive: false })
      .then((category: any) => {
        if (category) {
          res
            .status(200)
            .send({ isSuccess: true, msg: "Deleted successfully!" });
        } else {
          res
            .status(400)
            .send({ isSuccess: false, msg: "This category is not existing!" });
        }
      })
      .catch(next);
  },
};
