const express = require('express');
const jwt = require('jsonwebtoken');
const signInModel = require('../../Models/Authentication/SignIn.model');
var path= require('path');
const {stringify} =require('querystring');
const fetch = require('node-fetch');

const router = express.Router();

/**
 * login
 */

router.get('/', (_, res) => res.sendFile(path.join(__dirname, "../../index.html")));

//Đăng nhập
router.post('/', async (req, res) => {
  // entity = {
  //   "TenDangNhap": "MyAccount",
  //   "MatKhau": "123456",
  //   "captcha": "345jfdgdfgdfglfdgdfg"
  // }

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

  const payload = {
    userId: ret.id
  }

  //Tao token
  const token = jwt.sign(payload, 'secretKey', {
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



module.exports = router;