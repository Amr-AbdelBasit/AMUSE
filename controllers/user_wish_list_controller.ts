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

  async all(req: any, res: any, next: any) {
    const wishListsResponse = new Array();
    UserWishList.find({ isActive: true, userId: req.params.userId })
      .populate("user video", { name: 1, _id: 0 })
      .exec((err: any, wishLists: any) => {
        if (err) res.status(400).send(err);
        wishLists.forEach((wishList: any) => {
          wishListsResponse.push({
            id: wishList.id,
            userName: wishList.user.name,
            videoName: wishList.video.name,
          });
        });
        res.status(200).send({ wishList: wishListsResponse });
      });
  },
};
