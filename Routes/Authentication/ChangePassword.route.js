const express = require('express');
const changePasswordModel = require('../../Models/Authentication/SignIn.model');

const fetch = require('node-fetch');


const {  
  changePasswordValidationRules,
  validate,  
} = require('../../Middlewares/Validator');

const router = express.Router();

// Thay đổi mật khẩu
router.post('/', changePasswordValidationRules(), validate, async (req, res, next) => {

  // payload = {
  //   "TenDangNhap": "myaccount6"  
  //   "MatKhauCu": "123456",
  //   "MatKhauMoi": "1234567",
  //   "XacNhanMatKhau": "1234567"
  // }

  // Lấy dữ liệu từ client
  let payload = req.body;

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