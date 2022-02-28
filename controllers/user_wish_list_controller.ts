const UserWishList = require("../models/user_wish_list");
const User = require("../models/user");
const Video = require("../models/video");

module.exports = {
  async add(req: any, res: any, next: any) {
    const userId = req.user.id;
    const videoId = req.params.videoId;
    const isUserExisting = await User.exists({ _id: userId, isActive: true });
    const isVideoExisting = await Video.exists({
      _id: videoId,
      isActive: true,
    });
    if (!isUserExisting || !isVideoExisting)
      res
        .status(400)
        .send({ isSuccess: false, msg: "Invalid video or user Id!" });
    else {
      let isUserExist = await UserWishList.exists({ userId, videoId });
      if (isUserExist) {
        res.status(400).send({
          isSuccess: false,
          msg: "This video is already added before!",
        });
      } else {
        UserWishList.create({ userId, videoId }).then((userWishList: any) => {
          res.status(201).send({
            isSuccess: true,
            data: {
              id: userWishList.id,
              userId: userWishList.userId,
              videoId: userWishList.videoId,
            },
          });
        });
      }
    }
  },

  async all(req: any, res: any, next: any) {
    const userId = req.user.id;
    const lang = req.query.lang == "ar" ? "ar" : "en";
    const wishListsResponse = new Array();
    const isUserExisting = await User.exists({ _id: userId, isActive: true });
    if (!isUserExisting)
      res
        .status(400)
        .send({ isSuccess: false, msg: "This user is not existing!" });
    else {
      UserWishList.find({ isActive: true, userId: userId })
        .populate("userId videoId", { name: 1, _id: 0 })
        .exec((err: any, wishLists: any) => {
          if (err)
            res.status(422).send({ isSuccess: false, err_msg: err.message });
          wishLists.forEach((wishList: any) => {
            wishListsResponse.push({
              id: wishList.id,
              userName: wishList.userId.get(`name.${lang}`),
              videoName: wishList.videoId.name,
            });
          });
          res.status(200).send({ isSuccess: true, data: wishListsResponse });
        });
    }
  },
};
