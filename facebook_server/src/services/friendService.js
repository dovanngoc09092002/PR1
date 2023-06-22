const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { Friendships, Users, Messages } = require("../models");

export const createFriendShip = (body) =>
  new Promise(async (reslove, reject) => {
    try {
      const check = await Friendships.findOne({
        where: {
          senderId: body.senderId || body.receiverId,
          receiverId: body.receiverId || body.senderId,
        },
      });

      if (check) {
        reslove({
          errCode: 1,
          message: "Đã có lời mời",
        });
      } else {
        const friendShip = await Friendships.create({
          senderId: body.senderId,
          receiverId: body.receiverId,
          status: "pending",
        });
        reslove({
          errCode: 0,
          message: "Gửi lời mời thành công",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

export const checkFriendService = (body) =>
  new Promise(async (reslove, reject) => {
    try {
      const check = await Friendships.findOne({
        where: {
          [Op.or]: [
            {
              senderId: parseInt(body.senderId),
              receiverId: parseInt(body.receiverId),
            },
            {
              senderId: parseInt(body.receiverId),
              receiverId: parseInt(body.senderId),
            },
          ],
        },
        raw: true,
      });

      if (!check) {
        reslove({
          errCode: 1,
          issend: false,
          accept: false,
        });
      }
      if (check) {
        if (check.status === "accepted") {
          reslove({
            issend: true,
            accept: true,
          });
        }
        if (check.status === "pending") {
          reslove({
            issend: true,
            accept: false,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });

export const acceptFriendShip = (id) =>
  new Promise(async (reslove, reject) => {
    try {
       await Friendships.update(
        {
          status: "accepted",
        },
        {
          where: { id: id },
        }
      );
      const a = await Friendships.findOne({
        where: { id: id },
        raw: true
      })
      console.log(a);
       await Messages.create({
         senderId: a.senderId,
         receiverId: a.receiverId,
         content: "Chấp nhận lời mời kết bạn",
       });

      reslove({
        errCode: 0,
        message: "Chập nhận",
      });
    } catch (error) {
      reject(error);
    }
  });

export const refuseFriendShip = (id) =>
  new Promise(async (reslove, reject) => {
    try {
      await Friendships.update(
        {
          status: "rejected",
        },
        {
          where: { id: id },
        }
      );

      reslove({
        errCode: 0,
        message: "Từ Chối",
      });
    } catch (error) {
      reject(error);
    }
  });

export const getFriendShips = (id) =>
  new Promise(async (reslove, reject) => {
    try {
      const friendrequests = await Friendships.findAll({
        where: {
          receiverId: id,
          status: "pending",
        },
        include: [
          {
            model: Users,
            as: "sender",
            attributes: ["id", "username", "avatar", "name"],
          },
        ],
        limit : 4,
        order: [["createdAt", "DESC"]],
      });

      reslove({
        friendrequests,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getFriends = (id) =>
  new Promise(async (reslove, reject) => {
    try {
      const friends = await Friendships.findAll({
        where: {
          status: "accepted",
          [Op.or]: [{ receiverId: id }, { senderId: id }],
        },
        raw: true,
      });
      const friendIds = friends.map((friend) =>
        friend.senderId === id ? friend.receiverId : friend.senderId
      );
      const friendsById = await Users.findAll({
        where: {
          id: friendIds,
        },
        raw: true,
       
      });
      friendsById.forEach((element) => {
        delete element.password;
      });

      reslove({
        errCode: 0,
        friendsById,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getNoneFriend = (id) =>
  new Promise(async (reslove, reject) => {
    try {
      // tìm ra tất cả các id đã tồn tại bảng friendShip
      const friends = await Friendships.findAll({
        where: {
          [Op.or]: [{ receiverId: id }, { senderId: id }],
        },
        raw: true,
      });
      const friendIds = friends.map((friend) =>
        friend.senderId === id ? friend.receiverId : friend.senderId
      );

      const newIds = [id, ...friendIds];

      //tìm ra danh sách loại trừ danh sách kia
      const noneFriends = await Users.findAll({
        where: {
          id: {
            [Op.notIn]: newIds,
          },
        },
        limit: 4,
      });

      noneFriends.forEach((element) => {
        element.password = null;
      });

      reslove({
        noneFriends: noneFriends,
      });
    } catch (error) {
      reject(error);
    }
  });

export const removeFriend = (body) =>
  new Promise(async (reslove, reject) => {
    try {
      const check = await Friendships.findOne({
        where: {
          [Op.or]: [
            { receiverId: body.UserId, senderId: body.idFriend },
            { receiverId: body.idFriend, senderId: body.UserId },
          ],
        },
      });
      if (check) {
       const removeFriend = await Friendships.destroy({
          where: {
            [Op.or]: [
              { receiverId: body.UserId, senderId: body.idFriend },
              { receiverId: body.idFriend, senderId: body.UserId },
            ],
          },
        });

        reslove({
          errCode: 0,
          message: "Xóa thành công",
          data: removeFriend,
        });

      }
      else{
        reslove({
          errCode : 1,
          message : 'Không tồn tại bạn bè ',
          data : null
        })
      }


     
    } catch (error) {
      reject(error);
    }
  });
