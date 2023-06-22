const { Likes, Posts } = require("../models");

export const createLike = (body) =>
  new Promise(async (reslove, reject) => {
    try {
      const CheckLike = await Likes.findOne({
        where: {
          UserId: body.UserId,
          PostId: body.PostId,
        },
      });

      if (!CheckLike) {
        const createLike = await Likes.create({
          UserId: body.UserId,
          PostId: body.PostId,
        });
        if (createLike) {
          const FindPost = await Posts.findOne({ where: { id: body.PostId } });
          const numberLike = FindPost.likes;
          const newNumberLike = parseInt(numberLike) + 1;
          const PostUpdate = await Posts.update(
            {
              likes: newNumberLike,
            },
            { where: { id: body.PostId } }
          );
          reslove({
            errCode: 0,
            like: true,
            data: PostUpdate,
          });
        } else {
          reslove({
            errCode: 1,
            message: "Tạo Like không thành công",
          });
        }
      } else {
        await CheckLike.destroy();
        const FindPost = await Posts.findOne({ where: { id: body.PostId } });
        const numberLike = FindPost.likes;
        const newNumberLike = parseInt(numberLike) - 1;
        const PostUpdate = await Posts.update(
          {
            likes: newNumberLike,
          },
          { where: { id: body.PostId } }
        );

        reslove({
          errCode: 0,
          message: "Xóa thành công",
          like: false,
          data: PostUpdate,
        });
      }
    } catch (error) {
      reject(error);
    }
  });

export const IsLike = (body) =>
  new Promise(async (reslove, reject) => {
    try {
      const like = await Likes.findOne({
        where: {
          UserId: body.UserId,
          PostId: parseInt(body.PostId),
        },
      });
      if (like) {
        reslove({
          errCode: 0,
          mesage: "Đã like",
          data: true,
        });
      } else {
        reslove({
          errCode: 0,
          message: "Chưa like",
          data: false,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
