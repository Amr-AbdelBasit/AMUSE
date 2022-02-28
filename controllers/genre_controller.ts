const Genre = require("../models/genre");

module.exports = {
  async add(req: any, res: any, next: any) {
    await Genre.create(req.body)
      .then((genre: any) =>
        res.status(201).send({
          isSuccesss: true,
          data: {
            id: genre.id,
            arName: genre.get("name.ar"),
            enName: genre.get("name.en"),
          },
        })
      )
      .catch(next);
  },

  async all(req: any, res: any, next: any) {
    const lang = req.query.lang == "ar" ? "ar" : "en";
    const genresResponse = new Array();
    await Genre.find({ isActive: true }, function (err: any, genres: any) {
      genres.forEach((genre: any) => {
        genresResponse.push({
          id: genre.id,
          name: genre.get(`name.${lang}`),
          imgPath: genre.imgPath,
        });
      });
      res.status(200).send({ isSuccess: true, data: genresResponse });
    })
      .clone()
      .catch(next);
  },

  async edit(req: any, res: any, next: any) {
    const genreId = req.params.id;
    await Genre.findByIdAndUpdate({ _id: genreId }, req.body, { new: true })
      .then((genre: any) => {
        if (genre) {
          res.status(200).send({
            isSuccess: true,
            data: {
              id: genre.id,
              name: genre.name,
              imgPath: genre.imgPath,
            },
          });
        } else {
          res.status(400).send({
            isSuccess: false,
            err_msg: "This genre is not existing!",
          });
        }
      })
      .catch(next);
  },

  async delete(req: any, res: any, next: any) {
    await Genre.findByIdAndUpdate({ _id: req.params.id }, { isActive: false })
      .then((genre: any) => {
        if (genre) {
          res
            .status(200)
            .send({ isSuccess: true, msg: "Deleted successfully!" });
        } else {
          res
            .status(400)
            .send({ isSuccess: false, msg: "This genre is not existing!" });
        }
      })
      .catch(next);
  },
};
