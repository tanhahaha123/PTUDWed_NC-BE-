const express = require('express');
const jwt = require('jsonwebtoken');

const signInModel = require('../../Models/Authentication/SignIn.model');
const changePasswordModel = require('../../Models/Authentication/SignIn.model');

var path= require('path');
const {stringify} =require('querystring');
const fetch = require('node-fetch');

// Check Validation
const { validationResult } = require("express-validator");
const { 
  userSignInValidationRules, 
  changePasswordValidationRules,
  validate,  
} = require('../../Middlewares/Validator');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.text());

//Hiển thị font-end 
router.get('/signin', (_, res) => res.sendFile(path.join(__dirname, "../../index.html")));

//Đăng nhập
router.post('/signin', userSignInValidationRules(),  async (req, res, next) => {

  // payload = {
  //   "TenDangNhap": "myaccount",
  //   "MatKhau": "123456",
  //   "captcha": "345jfdgdfgdfglfdgdfg"
  // }

  // Lấy dữ liệu từ client
  let payload = req.body;

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   res.status(422).json({ errors: errors.array() });
  //   return;
  // }

  validate(req,res,next);
  
  //Kiem tra captcha rong
  if (!req.body.captcha)
    return res.json({ success: false, msg: 'Please select captcha' });

  // Secret key
  const secretKey = '6LeC__8UAAAAAG1YNa2Y60f980yaoYl07YKObIgY';

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
  if (ret === null) {
    return res.json({
      success: false,
      authenticated: false,
      msg: "Ten dang nhap hoac tai khoan khong dung."
    })
  }

  const payload1 = {
    userId: ret.id
  }

  //Tao token
  const token = jwt.sign(payload1, 'secretKey', {
    expiresIn: '10m' // 10 mins
  })

  //Tra ve token
  res.json({
    // authenticated: true,
    accessToken: token,
    success: true, 
    msg: 'Captcha passed'
  });
 
});

// Thay đổi mật khẩu
router.post('/changepassword',changePasswordValidationRules(), validate, async (req, res) => {

  // payload = {
  //   "TenDangNhap": "myaccount6"  
  //   "MatKhauCu": "123456",
  //   "MatKhauMoi": "1234567",
  //   "XacNhanMatKhau": "1234567"
  // }

  // Lấy dữ liệu từ client
  let payload = req.body;
  console.log("HERE: Main");
  if( payload.XacNhanMatKhau != payload.MatKhauMoi){
    res.status(401).json({
      "err": "Xác thực mật khẩu không đúng."
    });
  }
  if( payload.MatKhauCu == payload.MatKhauMoi){
    res.status(401).json({
      "err": "Vui lòng nhập mật khẩu mới khác mật khẩu cũ."
    });
  }
  
  const result = await changePasswordModel.changePassword(payload);

  res.status(result.err ? 401: 201).json(result);
});


module.exports = router;