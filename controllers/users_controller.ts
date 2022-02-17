const User = require("../models/user");
const UserAccount = require("../models/user_account");
const Auth = require("../middleware/auth");

require("util").inspect.defaultOptions.depth = null;

module.exports = {
  async register(req: any, res: any, next: any) {
    const accounts = new Array();
    await User.create(req.body)
      .then(async (user: any) => {
        const token = await user.setUserToken();
        accounts.push(
          {
            "name.en": user.get("name.en"),
            "name.ar": user.get("name.ar"),
            userId: user.id,
            isParent: true,
            imgPath: process.env.parentImgPath,
          },
          {
            "name.en": "Kid1",
            "name.ar": "الطفل1",
            userId: user.id,
            imgPath: process.env.kid2ImgPath,
          },
          {
            "name.en": "Kid2",
            "name.ar": "الطفل2",
            userId: user.id,
            imgPath: process.env.kid1ImgPath,
          }
        );
        await UserAccount.create(accounts);
        res
          .status(201)
          .send({ isSuccess: true, data: { id: user._id, token: token } });
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
        let users = await User.aggregate([
          {
            $lookup: {
              from: "useraccounts",
              localField: "_id",
              foreignField: "userId",
              as: "userAccounts",
            },
          },
          {
            $lookup: {
              from: "genders",
              localField: "genderId",
              foreignField: "_id",
              as: "gender",
            },
          },
          {
            $match: {
              _id: user.id,
              // $and: [
              //   // { "user.isActive": { $eq: true } },
              // ],
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              email: 1,
              phone: 1,
              age: 1,
              code: 1,
              "gender.name": 1,
              "userAccounts.name": 1,
              "userAccounts.imgPath": 1,
              "userAccounts.isParent": 1,
            },
          },
        ]);
        users[0].token = user.token;
        res.status(200).send({ isSuccess: true, data: users[0] });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  // Login api return all
  // async all(req: any, res: any, next: any) {
  //   const usersResponse = new Array();
  //   User.find({ isActive: true }, function (err: any, users: any) {
  //     users.forEach((user: any) => {
  //       usersResponse.push({
  //         id: user.id,
  //         enName: user.get("name.en"),
  //         arName: user.get("name.ar"),
  //         email: user.email,
  //         phone: user.phone,
  //         age: user.age,
  //         genderId: user.genderId,
  //       });
  //     });
  //   })
  //     .clone()
  //     .then(() => res.status(200).send({ users: usersResponse }))
  //     .catch(next);
  // },

  async edit(req: any, res: any, next: any) {
    const userId = req.user.id;
    User.findByIdAndUpdate({ _id: userId }, req.body)
      .then(() => User.findById({ _id: userId }))
      .then((user: any) => {
        if (user) {
          res.status(200).send(user);
        } else {
          res.status(400).send("User is not exist!");
        }
      })
      .catch(next);
  },

  async editUserAccount(req: any, res: any, next: any) {
    const parentId = req.body.parentId;
    const kidId = req.body.kidId;
    UserAccount.findById({ _id: parentId })
      .then((user: any) => {
        if (user.isParent) {
          if (kidId) {
            UserAccount.findByIdAndUpdate({ _id: kidId }, req.body).then(
              (user: any) => {
                if (user) {
                  res.status(200).send(user);
                } else {
                  res.status(400).send("This kid is not existing!");
                }
              }
            );
          } else {
            UserAccount.findByIdAndUpdate({ _id: parentId }, req.body).then(
              (user: any) => {
                if (user) {
                  res.status(200).send(user);
                } else {
                  res.status(400).send("This parent is not existing!");
                }
              }
            );
          }
        } else {
          res.status(400).send("This user is not allowed to update!");
        }
      })
      .catch(next);
  },

  async delete(req: any, res: any, next: any) {
    const userId = req.user.id;
    User.findByIdAndUpdate({ _id: userId }, { isActive: false })
      .then((user: any) => {
        if (user) {
          res.status(200).send("Deleted successfully!");
        } else {
          res.status(400).send("This user is not existing!");
        }
      })
      .catch(next);
  },

  async updatePinCode(req: any, res: any, next: any) {
    const userId = req.user.id;
    const { parentId, code } = req.body;
    UserAccount.findById({ _id: parentId }).then((userAccount: any) => {
      if (userAccount.isParent) {
        User.findOneAndUpdate(
          { _id: userId },
          { code: code },
          { new: true }
        ).then((user: any) => {
          if (user) {
            res.status(200).send({
              id: user.id,
              enName: user.get("name.en"),
              arName: user.get("name.ar"),
              email: user.email,
              phone: user.phone,
              code: user.code,
            });
          } else {
            res.status(200).send("This user is not existing!");
          }
        });
      } else {
        res.status(400).send("This user is not allowed to update pin code!");
      }
    });
  },
};
