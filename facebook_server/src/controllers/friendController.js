const friendService = require("../services/friendService");

export const createFriendRelation = async (req, res) => {
  try {
    const senderId = req.idUser;
    const { receiverId } = req.body;
    const body = {
      senderId: senderId,
      receiverId: receiverId,
    };
    const response = await friendService.createFriendShip(body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};

export const acceptFriendRelation = async (req, res) => {
  try {
    const { id } = req.body;
    const response = await friendService.acceptFriendShip(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};

export const refuseFriendRelation = async (req, res) => {
  try {
    const { id } = req.body;
    const response = await friendService.refuseFriendShip(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};

export const friendrequestFriendRelation = async (req, res) => {
  try {
    const id = req.idUser;
    const response = await friendService.getFriendShips(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};

export const FriendRelation = async (req, res) => {
  try {
    const id = req.idUser;
    const response = await friendService.getFriends(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};

export const checkFriendRelation = async (req, res) => {
  try {
    const senderId = req.idUser;
    const { receiverId } = req.body;
    const body = {
      senderId: senderId,
      receiverId: receiverId,
    };
    const response = await friendService.checkFriendService(body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};

export const NoneFriendController = async (req, res) => {
  try {
    const id = req.idUser;
    const response = await friendService.getNoneFriend(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};



export const removeFriendController = async (req, res) => {
  try {
    const id = req.idUser;
    const { idFriend } = req.body
    const body = {
      UserId: parseInt(id),
      idFriend : parseInt(idFriend)
    };
    const response = await friendService.removeFriend(body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};




