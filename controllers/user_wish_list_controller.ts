const UserWishList = require("../models/user_wish_list");

module.exports = {
  async add(req: any, res: any, next: any) {
    const { userId, videoId } = req.body;
    let userExist = await UserWishList.exists({ userId, videoId });
    if (userExist) {
      res.status(400).send("This video is already added in the list!");
    } else {
      await UserWishList.create(req.body)
        .then((userViews: any) => res.status(201).send(userViews))
        .catch(next);
    }
  },
};
