const { Op } = require("sequelize");
const { Comments, Users } = require("../models");

export const createComment = (body) =>
  new Promise(async (reslove, reject) => {
    
    try {
      const comment = await Comments.create({
        PostId: body.PostId,
        UserId: body.UserId,
        commentBody: body.commentBody,
      });

      reslove({
        errCode: 0,
        message: "Tạo Cmt thành công",
        data: comment,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getCommentByidPost = (id) =>
  new Promise(async (reslove, reject) => {
    const comments = await Comments.findAll({
      where: {
        PostId: id,
      },
      include: {
        model: Users,
        as: "user",
        attributes: ["id", "avatar", "username", "name"],
      },
      order: [["createdAt", "DESC"]],
    });
    try {
      reslove({
        data: comments,
      });
    } catch (error) {
      reject(error);
    }
  });
