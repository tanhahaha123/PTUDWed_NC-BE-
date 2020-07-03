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

//Hiển thị font-end 
router.get('/', (_, res) => res.sendFile(path.join(__dirname, "../../index.html")));

//Đăng nhập
router.post('/',userSignInValidationRules(), validate,  async (req, res, next) => {

  // payload = {
  //   "TenDangNhap": "myaccount",
  //   "MatKhau": "123456",
  //   "captcha": "345jfdgdfgdfglfdgdfg"
  // }

  // Lấy dữ liệu
  let payload = req.body;

  // //Kiem tra captcha rong
  // if (!payload.captcha)
  //   return res.json({ success: false, msg: 'Please select captcha' });

  // //Secret key
  // const secretKey = '6LeC__8UAAAAAG1YNa2Y60f980yaoYl07YKObIgY';

  // // Verify URL
  // const query = stringify({
  //   secret: secretKey,
  //   response: req.body.captcha,
  //   remoteip: req.connection.remoteAddress
  // });
  
  // const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;

  // // Make a request to verifyURL
  // const body = await fetch(verifyURL).then(res => res.json());

  // // If not successful
  // if (body.success !== undefined && !body.success)
  //   return res.json({ success: false, msg: 'Failed captcha verification' });

  const ret = await signInModel.login(req.body);
  if (ret === null) {
    return res.json({
      success: false,
      authenticated: false,
      msg: "Ten dang nhap hoac tai khoan khong dung."
    })
  }

  const payload1 = {
    userId: ret.idTaiKhoanKhachHang
  }

  //Tao token
  const token = jwt.sign(payload1, config.AUTH.secretKey, {
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
    token,
    refreshToken,
  }

  //Tra ve token
  // authenticated: true,
  return res.json({
    success: true, 
    response: response,
    msg: 'Captcha passed'
  });
 
});

/**
 * Lấy mã token mới sử dụng Refresh token
 * POST /refresh_token
 */
// router.post('/refresh_token', async (req, res) => {
//   // User gửi mã Refresh token kèm theo trong body
//   const { refreshToken } = req.body;
//   // Kiểm tra Refresh token có được gửi kèm và mã này có tồn tại trên hệ thống hay không
//   if ((refreshToken) && (refreshToken in tokenList)) {
//     try {
//       // Kiểm tra mã Refresh token
//       await utils.verifyJwtToken(refreshToken, config.AUTH.refreshKey);
//       // Lấy lại thông tin user
//       const user = tokenList[refreshToken];
//       // Tạo mới mã token và trả lại cho user
//       const token = jwt.sign(user, config.AUTH.secretKey, {
//         expiresIn: config.AUTH.secretTokenLife
//       });
//       const response = {
//         token,
//       }
//       res.status(200).json(response);
//     } catch (err) {
//       console.error(err);
//       res.status(403).json({
//         message: 'Invalid refresh token',
//       });
//     }
//   } else {
//     res.status(400).json({
//       message: 'Invalid request',
//     });
//   }
// });


router.use(verify);

router.get('/profile', (req, res) => {
  // all secured routes goes here
  res.json(req.decoded)
})


module.exports = router;