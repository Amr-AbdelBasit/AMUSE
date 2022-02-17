const Category = require("../models/category");

module.exports = {
  async add(req: any, res: any, next: any) {
    Category.create(req.body)
      .then((category: any) => res.status(201).send(category))
      .catch(next);
  },

  async all(req: any, res: any, next: any) {
    const categoriesResponse = new Array();
    Category.find({ isActive: true }, function (err: any, categories: any) {
      categories.forEach((category: any) => {
        categoriesResponse.push({
          id: category.id,
          enName: category.get("name.en"),
          arName: category.get("name.ar"),
        });
      });
    })
      .clone()
      .then(() => res.status(200).send({ categories: categoriesResponse }))
      .catch(next);
  },

  async delete(req: any, res: any, next: any) {
    Category.findByIdAndUpdate({ _id: req.params.id }, { isActive: false })
      .then((category: any) => {
        if (category) {
          res.status(200).send("Deleted successfully!");
        } else {
          res.status(400).send("This category is not exist!");
        }
      })
      .catch(next);
  },
};
