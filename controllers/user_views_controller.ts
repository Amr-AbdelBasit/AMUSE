export {};
const UserViews = require("../models/user_views");
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
      let isUserExist = await UserViews.exists({ userId, videoId });
      if (isUserExist) {
        await UserViews.findOneAndUpdate(
          { userId, videoId },
          { $inc: { viewsCount: 1 } },
          { new: true }
        )
          .populate("userId videoId", { name: 1, _id: 0 })
          .exec((err: any, userView: any) => {
            if (err)
              res.status(422).send({ isSuccess: false, err_msg: err.message });
            res.status(200).send({
              isSuccess: true,
              data: {
                id: userView.id,
                userName: userView.userId.name,
                videoName: userView.videoId.name,
                viewsCount: userView.viewsCount,
              },
            });
          });
      } else {
        await UserViews.create({ userId, videoId })
          .then((userView: any) =>
            res.status(201).send({
              isSuccess: true,
              data: {
                id: userView.id,
                viewsCount: userView.viewsCount,
              },
            })
          )
          .catch(next);
      }
    }
  },

  async all(req: any, res: any, next: any) {
    const lang = req.query.lang == "ar" ? "ar" : "en";
    const userId = req.user.id;
    const userViewsResponse = new Array();
    const isUserExisting = await User.exists({ _id: userId, isActive: true });
    if (!isUserExisting)
      res
        .status(400)
        .send({ isSuccess: false, msg: "This user is not existing!" });
    else {
      UserViews.find({ isActive: true, userId: userId })
        .populate("userId videoId", { name: 1, _id: 0 })
        .exec((err: any, userViews: any) => {
          if (err)
            res.status(422).send({ isSuccess: false, err_msg: err.message });
          userViews.forEach((userView: any) => {
            userViewsResponse.push({
              id: userView.id,
              userName: userView.userId.get(`name.${lang}`),
              videoName: userView.videoId.name,
              viewsCount: userView.viewsCount,
            });
          });
          res.status(200).send({ isSuccess: true, data: userViewsResponse });
        });
    }
  },
};
