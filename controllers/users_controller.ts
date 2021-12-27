const User = require("../models/account/user");
require("util").inspect.defaultOptions.depth = null;

module.exports = {
  async register(req: any, res: any, next: any) {
    await User.create(req.body)
      .then(async (user: any) => {
        const token = await user.setUserToken();
        res.status(201).send({ code: 1, data: { token: token, id: user._id } });
      })
      .catch(next);
  },

  async login(req: any, res: any, next: any) {
    const { phone, password } = req.body;
    try {
      const user = await User.checkUsercredential(phone, password);
      if (user.Error != null) {
        res.status(400).send(user.Error);
      } else {
        res.status(200).send({ code: 1, data: user });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async all(req: any, res: any, next: any) {
    const usersResponse = new Array();
    User.find({ isActive: true }, function (err: any, users: any) {
      users.forEach((user: any) => {
        usersResponse.push({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          age: user.age,
          genderId: user.genderId,
        });
      });
    })
      .clone()
      .then(() => res.status(200).send({ users: usersResponse }))
      .catch(next);
  },

  async edit(req: any, res: any, next: any) {
    const userId = req.params.id;
    const userProps = req.body;
    User.findByIdAndUpdate({ _id: userId }, userProps)
      .then(() => User.findById({ _id: userId }))
      .then((user: any) => {
        if (user == null) {
          res.status(400).send("User not exist!");
        } else {
          res.status(200).send(user);
        }
      })
      .catch(next);
  },

  async delete(req: any, res: any, next: any) {
    const userId = req.params.id;
    User.findByIdAndUpdate({ _id: userId }, { isActive: false })
      .then((user: any) => {
        if (user == null) {
          res.status(400).send("User not exist!");
        } else {
          res.status(200).send("Deleted successfully!");
        }
      })
      .catch(next);
  },
};
