export {};
const UserViews = require("../models/user_views");

module.exports = {
  async add(req: any, res: any, next: any) {
    const { userId, videoId } = req.body;
    let userExist = await UserViews.exists({ userId, videoId });
    if (userExist) {
      var userViewsUpdated = await UserViews.findOneAndUpdate(
        { userId, videoId },
        { $inc: { viewsCount: 1 } },
        { new: true }
      );
      res.status(200).send(userViewsUpdated);
    } else {
      await UserViews.create(req.body)
        .then((userViews: any) => res.status(201).send(userViews))
        .catch(next);
    }
  },

  async all(req: any, res: any, next: any) {
    const userViewsResponse = new Array();
    UserViews.find({ isActive: true, userId: req.params.userId })
      .populate("user video", { name: 1, _id: 0 })
      .exec((err: any, userViews: any) => {
        if (err) res.status(400).send(err);
        userViews.forEach((userView: any) => {
          userViewsResponse.push({
            id: userView.id,
            userName: userView.user.name,
            videoName: userView.video.name,
            viewsCount: userView.viewsCount,
          });
        });
        res.status(200).send({ userViews: userViewsResponse });
      });
  },
};
