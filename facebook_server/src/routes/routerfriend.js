const express = require("express");
const friendRouter = express.Router();
const { middlewareLogin } = require("../middware/middwareLogin");
const friendController = require("../controllers/friendController");

//api gửi lời mời kết bạn
friendRouter.post(
  "/send",
  middlewareLogin,
  friendController.createFriendRelation
);

//api chấp nhận lời mời kết bạn
friendRouter.post("/accept", friendController.acceptFriendRelation);

//api hủy lời mời kết bạn
friendRouter.post("/refuse", friendController.refuseFriendRelation);

//api lấy ra yêu cầu những lời mời kết bạn
friendRouter.get(
  "/friendrequest",
  middlewareLogin,
  friendController.friendrequestFriendRelation
);

//api lấy ra những bạn bè
friendRouter.get("/friends", middlewareLogin, friendController.FriendRelation);

//api check xem A có phải bạn của mình không
friendRouter.post(
  "/checkFriend",
  middlewareLogin,
  friendController.checkFriendRelation
);

//api lấy ra những người không phải bạn bè ( gợi ý kết bạn )
friendRouter.get(
  "/nonefriends",
  middlewareLogin,
  friendController.NoneFriendController
);


//api hủy kết bạn
friendRouter.post(
  "/removeFriend",
  middlewareLogin,
  friendController.removeFriendController
);


module.exports = friendRouter;
