const LikeService = require("../services/LikeService");

export const createLike = async (req, res) => {
  try {
    const { PostId } = req.body;
    const UserId = req.idUser;
    const body = {
      PostId : parseInt(PostId),
      UserId : parseInt(UserId)
    }
    const response = await LikeService.createLike(body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};

export const isLike = async (req, res) => {
  try {
    const { PostId } = req.body;
    const UserId = req.idUser;
    const body = {
      PostId: parseInt(PostId),
      UserId: parseInt(UserId),
    };
    const response = await LikeService.IsLike(body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};


