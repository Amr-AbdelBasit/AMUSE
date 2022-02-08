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
};
