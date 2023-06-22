const express = require("express");
const jwt = require("jsonwebtoken");
const { Comments, Users } = require("../models");
const commentRouter = express.Router();
const commentController = require("../controllers/commentController");
const { middlewareLogin } = require("../middware/middwareLogin");
const { io } = require("../../server");

// comment realtime của 1 bài post
io.on("connection", (socket) => {
  // const test = socket;
  // console.log("this is test", test);


  // const UserId = 1;

  socket.on("newComment", async (data) => {
    try {
      const comment = await Comments.create({
        UserId: data.idUser,
        PostId: data.PostId,
        commentBody: data.cmt,
      });
      const newComment = await Comments.findOne({
        where: {
          PostId: comment.PostId,
          UserId: comment.UserId,
          commentBody: comment.commentBody,
        },
        include: {
          model: Users,
          as: "user",
          attributes: ["id", "avatar", "username", "name"],
        },
      });
      // Phát sự kiện "newComment" tới tất cả các client

      io.emit("newComment", newComment);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    // console.log(`Client disconnected: ${socket.id}`);
  });
});

//api tạo comments
commentRouter.post(
  "/create",
  middlewareLogin,
  commentController.createCommentController
);

//api lấy các comment theo id bài viết
commentRouter.get(
  "/getbyidpost/:id",
  commentController.getByIdPostCommentController
);

module.exports = commentRouter;
