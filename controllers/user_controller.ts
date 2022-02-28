import { ObjectId } from "mongodb";
const User = require("../models/user");
const Avatar = require("../models/avatar");
const UserAccount = require("../models/user_account");
const bcrypt = require("bcrypt");
const multer = require("multer");

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
    const lang = req.query.lang == "ar" ? "ar" : "en";
    const { phone, password } = req.body;
    try {
      const user = await User.checkUsercredential(phone, password);
      if (user.Error) {
        res.status(422).send({ isSuccess: false, err_msg: user.Error });
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
          { $match: { _id: new ObjectId(user.id) } },
          {
            $unwind: "$gender",
          },
          {
            $project: {
              _id: 1,
              name: `$name.${lang}`,
              email: 1,
              phone: 1,
              age: 1,
              code: 1,
              genderName: `$gender.name.${lang}`,
              userAccounts: {
                $map: {
                  input: "$userAccounts",
                  as: "userAccount",
                  in: {
                    id: "$$userAccount._id",
                    name: `$$userAccount.name.${lang}`,
                    imgPath: "$$userAccount.imgPath",
                    isParent: "$$userAccount.isParent",
                  },
                },
              },
            },
          },
        ]);
        users[0].token = user.token;
        res.status(200).send({ isSuccess: true, data: users[0] ?? null });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ isSuccess: false, err_msg: error });
    }
  },

  async all(req: any, res: any, next: any) {
    const lang = req.query.lang == "ar" ? "ar" : "en";
    const usersResponse = new Array();
    UserAccount.find({ isActive: true, isParent: true })
      .populate("userId", { _id: 1, email: 1 })
      .exec((err: any, users: any) => {
        if (err)
          res.status(400).send({ isSuccess: false, err_msg: err.message });
        users.forEach((user: any) => {
          if (user.userId) {
            usersResponse.push({
              id: user.userId.id,
              name: user.get(`name.${lang}`),
              email: user.userId.email,
              imgPath: user.imgPath,
              pricingPlan: "Premium | Free",
              createdDate: user.createdAt,
            });
          }
        });
        res.status(200).send({ isSuccess: true, data: usersResponse });
      });
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
      .then((user: any) => {
        if (user) {
          res.status(200).send({ isSuccess: true, data: user });
        } else {
          res
            .status(400)
            .send({ isSuccess: false, msg: "This user is not existing!" });
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
                  res.status(200).send({ isSuccess: true, data: user });
                } else {
                  res.status(400).send({
                    isSuccess: false,
                    msg: "This kid is not existing!",
                  });
                }
              }
            );
          } else {
            UserAccount.findByIdAndUpdate({ _id: parentId }, req.body).then(
              (user: any) => {
                if (user) {
                  res.status(200).send({ isSuccess: true, data: user });
                } else {
                  res.status(400).send({
                    isSuccess: false,
                    msg: "This parent is not existing!",
                  });
                }
              }
            );
          }
        } else {
          res.status(400).send({
            isSuccess: false,
            msg: "The kid is not allowed to update!",
          });
        }
      })
      .catch(next);
  },

  async updatePinCode(req: any, res: any, next: any) {
    const userId = req.user.id;
    const { parentId, code } = req.body;
    UserAccount.findById({ _id: new ObjectId(parentId) }).then(
      (userAccount: any) => {
        if (!userAccount)
          res
            .status(400)
            .send({ isSuccess: false, msg: "This parent is not existing!" });
        else if (userAccount.isParent) {
          User.findOneAndUpdate(
            { _id: userId },
            { code: code },
            { new: true }
          ).then((user: any) => {
            if (user) {
              res.status(200).send({
                isSuccess: true,
                data: {
                  id: user.id,
                  enName: user.get("name.en"),
                  arName: user.get("name.ar"),
                  email: user.email,
                  phone: user.phone,
                  code: user.code,
                },
              });
            } else {
              res
                .status(400)
                .send({ isSuccess: false, msg: "The user is not existing!" });
            }
          });
        } else {
          res.status(400).send({
            isSuccess: false,
            msg: "The kid is not allowed to update the pin code!",
          });
        }
      }
    );
  },

  async updatePassword(req: any, res: any, next: any) {
    const userId = req.user.id;
    const { parentId, oldPassword, newPassword } = req.body;
    UserAccount.findById({ _id: new ObjectId(parentId) }).then(
      async (user: any) => {
        if (!user)
          res
            .status(400)
            .send({ isSuccess: false, msg: "This parent is not existing!" });
        else if (user.isParent) {
          await User.findById({ _id: userId })
            .then(async (user: any) => {
              if (!user)
                res.status(400).send({
                  isSuccess: false,
                  msg: "This user is not existing!",
                });
              const checkPwd = await bcrypt.compare(oldPassword, user.password);
              if (!checkPwd)
                res
                  .status(400)
                  .send({ isSuccess: false, msg: "Wrong password!" });
            })
            .catch(next);

          User.findOneAndUpdate(
            { _id: userId },
            { password: await bcrypt.hash(newPassword, 8) },
            { new: true }
          )
            .then((user: any) => {
              res.status(200).send({
                isSuccess: true,
                data: {
                  id: user.id,
                  enName: user.get("name.en"),
                  arName: user.get("name.ar"),
                  email: user.email,
                  phone: user.phone,
                },
              });
            })
            .catch(next);
        } else {
          res
            .status(400)
            .send({ isSuccess: false, msg: "This user is not a parent!" });
        }
      }
    );
  },

  async verifyPinCode(req: any, res: any, next: any) {
    const userId = req.user.id;
    const code = req.params.code;
    const codeIsNumber = Number(code);
    if (!codeIsNumber)
      res.status(400).send({ isSuccess: false, msg: "Code must be a number!" });
    else {
      const isExisting = await User.exists({ _id: userId, code: code });
      if (isExisting)
        res
          .status(200)
          .send({ isSuccess: true, msg: "Verified successfully!" });
      else
        res.status(400).send({ isSuccess: false, msg: "Verification failed!" });
    }
  },

  async uploadAvatar(req: any, res: any) {
    const imgStorage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, "public/images/avatars");
      },

      filename: function (req: any, file: any, cb: any) {
        cb(null, `${Date.now()}_${file.originalname}`);
      },
    });

    const uploadAvatar = multer({ storage: imgStorage }).single("avatar");
    uploadAvatar(req, res, async (err: any) => {
      if (err) {
        res.status(422).send({ isSuccess: false, err_msg: err.message });
      } else {
        res.setHeader("Content-Type", "application/json");
        await Avatar.create({ path: req.file.path }).then((avatar: any) => {
          res.status(200).send({
            isSuccess: true,
            data: {
              id: avatar.id,
              fileName: req.file.filename,
              path: avatar.path,
            },
          });
        });
      }
    });
  },

  async getAllAvatars(req: any, res: any, next: any) {
    const avatarResponses = new Array();
    await Avatar.find({ isActive: true }, function (err: any, avatars: any) {
      if (err) res.status(400).send({ isSuccess: false, err_msg: err.message });
      avatars.forEach((avatar: any) => {
        avatarResponses.push({
          id: avatar.id,
          path: avatar.path,
        });
      });
      res.status(200).send({ isSuccess: true, data: avatarResponses });
    })
      .clone()
      .catch(next);
  },

  async delete(req: any, res: any, next: any) {
    const userId = req.user.id;
    User.findByIdAndUpdate({ _id: userId }, { isActive: false })
      .then((user: any) => {
        if (user) {
          res
            .status(200)
            .send({ isSuccess: true, msg: "Deleted successfully!" });
        } else {
          res
            .status(400)
            .send({ isSuccess: false, msg: "This user is not existing!" });
        }
      })
      .catch(next);
  },
};
