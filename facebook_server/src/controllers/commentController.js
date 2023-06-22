const commentService = require("../services/commentService");

export const createCommentController = async (req, res) => {
  try {
    const body = {
      PostId: req.body.PostId,
      UserId: req.idUser,
      commentBody: req.body.CommentBody,
    };
    const response = await commentService.createComment(body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};

export const getByIdPostCommentController = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await commentService.getCommentByidPost(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};
