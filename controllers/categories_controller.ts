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
          name: category.name,
        });
      });
    })
      .clone()
      .then(() => res.status(200).send({ categories: categoriesResponse }))
      .catch(next);
  },
};
