const userService = require("../services/userSevices");
const { validationResult } = require("express-validator");
export const userRegisterController = async (req, res) => {
  const { username, password, name } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!username || !password || !name) {
      return res.status(400).json({
        errCode: 1,
        message: "Cần điền đủ thông tin",
      });
    }

    const response = await userService.userRegisterService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};

export const userLoginController = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({
        errCode: 1,
        message: "Cần điền đủ thông tin",
      });
    }
    const response = await userService.userLoginService(req.body);
    // if (response.errCode === 0){
    //      res.cookie("token", response.token, {
    //        maxAge: 86400000,
    //        httpOnly: true,
    //        secure: true,
    //        sameSite: "none",
    //        domain: "localhost",
    //        path: "/",
    //      });
    //  return res.status(200).json(response);

    // }
     return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};


export const userLogoutController = async (req, res) => {
 
  const idUser = req.idUser;
  const body = {

    idUser,
  };
  try {
    const response = await userService.userLogoutService(body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};
export const userchangePasswordController = async (req, res) => {
  const idUser = req.idUser;

  const { currentPass, newPass } = req.body;
  const body = {
    newPass,
    currentPass,
    idUser,
  };
    try {
      const response = await userService.userchangePassservice(body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({
        errCode: -1,
        message: "Lỗi server",
        error: error,
      });
    }
  
};




export const userJwtController = async (req, res) => {
  const id = req.idUser;
  try {
    const response = await userService.userGetprofileService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};

export const userUpdateController = async (req, res) => {
  const { username, name, avatar } = req.body;
  // const token = req.cookies.token;
  const idUser = req.idUser;
  const body = {
    username: username,
    name: name,
    avatar: avatar,
    idUser: idUser,
    // token: token,
  };

  try {
    if (!username || !name || !avatar) {
      return res.status(400).json({
        errCode: 1,
        message: "Cần điền đủ thông tin",
      });
    }
    const response = await userService.userUpdateService(body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};

export const userIdController = async (req, res) => {
  const id = req.params.id;

  try {
    const response = await userService.userGetprofileService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};

export const getUserandMessages = async (req, res) => {
  const body = {
    userid: parseInt(req.idUser),
  };

  try {
    const response = await userService.userGetMessService(body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};

export const searchUser = async (req, res) => {
  
  const { search } = req.body;
  console.log("this is search user" , search);
  const body = {
    search,
    idUser: req.idUser,
  };

  try {
    const response = await userService.searchUser(body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Lỗi server",
      error: error,
    });
  }
};


