const express = require('express');
const jwt =require('jsonwebtoken');
const signInModel = require('../../Models/Authentication/SignIn.model');
const RefreshTokenModel = require('../../Models/Authentication/RefreshToken.model');
const { verify} = require('../../Middlewares/Verify');
const utils = require('../../Middlewares/Utils');

var path= require('path');
const {stringify} =require('querystring');
const fetch = require('node-fetch');

const config = require('../../Config/config.json');
const { 
  userSignInValidationRules, 
  changePasswordValidationRules,
  validate,  
} = require('../../Middlewares/Validator');

const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.text());

// const tokenList ={};

//Đăng nhập
router.post('/',userSignInValidationRules(), validate,  async (req, res, next) => {

  // payload = {
    // "TenDangNhap": "myaccount",
    // "MatKhau": "123456",
  //   "captcha": "345jfdgdfgdfglfdgdfg"
  // }

  // Lấy dữ liệu
  let payload = req.body;

  //Kiem tra captcha rong
  if (!payload.captcha)
    return res.json({ success: false, msg: 'Please select captcha' });

  //Secret key
  const secretKey = '6LeTS7YZAAAAAM90bgMCjov6tjuPd_1E71nzkSeV';

  // Verify URL
  const query = stringify({
    secret: secretKey,
    response: req.body.captcha,
    remoteip: req.connection.remoteAddress
  });
  
  const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;

  // Make a request to verifyURL
  const body = await fetch(verifyURL).then(res => res.json());

  // If not successful
  if (body.success !== undefined && !body.success)
    return res.json({ success: false, msg: 'Failed captcha verification' });

  const ret = await signInModel.login(req.body);

  //Nếu không có dữ liệu trả về
  if (ret === null) {
    return res.json({
      success: false,
      authenticated: false,
      msg: "Tên đăng nhập hoặc tài khoản không đúng"
    })
  }
  //console.log("khachhang*nganhang:", ret);
  //Ngược lại có dữ liệu trả về
  const payload1 = {
    "idTaiKhoanKhachHang": ret.idTaiKhoanKhachHang,
  }

  //Tao token
  const accessToken = jwt.sign(payload1, config.AUTH.secretKey, {
    expiresIn: config.AUTH.secretTokenLife
  })

   // Tạo một mã token khác - Refresh token
   const refreshToken = jwt.sign(payload1, config.AUTH.refreshKey, {
    expiresIn: config.AUTH.refreshTokenLife
  });
  // Lưu lại mã Refresh token, kèm thông tin của user để sau này sử dụng lại
  // tokenList[refreshToken] = payload1;
  let resultDeleteRefreshToken = await RefreshTokenModel.deleteRefreshToken(ret.idTaiKhoanKhachHang);
  let rowRefreshToken = {
      "idTaiKhoanKhachHang": ret.idTaiKhoanKhachHang,
      "RefreshToken": refreshToken
  };
  let resultAddRefreshToken = await RefreshTokenModel.addRefreshToken(rowRefreshToken);
  // Trả lại cho user thông tin mã token kèm theo mã Refresh token
  const response = {
    accessToken,
    refreshToken,
  }

  const dataReturn = {
    "SourceAccountNumber": ret.SoTaiKhoan,
    "TenKhachHang": ret.TenKhachHang
  }
  //Tra ve token
  // authenticated: true,
  return res.json({
    success: true, 
    response: response,
    ...dataReturn,
    msg: 'Đăng nhập thành công'
  });
 
});

/**
 * Lấy mã token mới sử dụng Refresh token
 * POST /refresh_token
 */
router.post('/refresh_token', async (req, res) => {
  // User gửi mã Refresh token kèm theo trong body
  const { refreshToken } = req.body;
  const refreshTokenInDB = await RefreshTokenModel.getRefreshToken(refreshToken);
  //console.log("refreshTokenInDB: ", refreshTokenInDB);
  // Kiểm tra Refresh token có được gửi kèm và mã này có tồn tại trên hệ thống hay không
  if ((refreshToken) && (refreshTokenInDB.length!=0)) {
    // try {
      // Kiểm tra mã Refresh token
      //await utils.verifyJwtToken(refreshToken, config.AUTH.refreshKey);

      jwt.verify(refreshToken, config.AUTH.refreshKey, async function(err, decoded) {
        if (err) return res.status(400).json(err);
        let resultGetRefreshToken = await RefreshTokenModel.getRefreshToken(refreshToken);
        if (resultGetRefreshToken.length > 0) {
          let AccessToken = jwt.sign({"idTaiKhoanKhachHang":decoded.userId}, config.AUTH.secretKey, {expiresIn: config.AUTH.secretTokenLife});
          return res.json({ //dù sai vẫn thông báo
              "token": AccessToken
          });
        }
        else 
        {
          return res.status(400).json({
              err: 'RefreshToken không tồn tại'
          });
        }
      });
      
    //   const payload1 = {
    //     "idTaiKhoanKhachHang": refreshTokenInDB.idTaiKhoanKhachHang,
    //   }
    //   // Lấy lại thông tin user
    //   // Tạo mới mã token và trả lại cho user
    //   const token = jwt.sign(payload1, config.AUTH.secretKey, {
    //     expiresIn: config.AUTH.secretTokenLife
    //   });
    //   const response = {
    //     token
    //   }
    //   res.status(200).json(response.token);
    // } catch (err) {
    //   console.error(err);
    //   res.status(403).json({
    //     message: 'Invalid refresh token',
    //   });
    // }
  } else {
    res.status(400).json({
      message: 'Invalid request',
    });
  }
});


// router.use(verify);

// router.get('/profile', (req, res) => {
//   // all secured routes goes here
//   res.json(req.decoded)
// })


module.exports = router;