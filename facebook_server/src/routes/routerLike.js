const express = require("express");
const LikeRouter = express.Router();
const LikeController = require("../controllers/LikeController");
const { middlewareLogin } = require("../middware/middwareLogin");

//tao like cho bai post theo nguoi dung
LikeRouter.post("/check", middlewareLogin, LikeController.createLike);

LikeRouter.post("/islike", middlewareLogin, LikeController.isLike);


module.exports = LikeRouter;
