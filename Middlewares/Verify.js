require('express-async-errors');
const createError = require('http-errors');
const jwt = require("jsonwebtoken");
const utils =require('./Utils');
const config = require('../Config/config.json')

const verify = async(req, res, next) => {
    // Lấy thông tin mã token được đính kèm trong request
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // Xác thực mã token và kiểm tra thời gian hết hạn của mã
    try {
      const decoded = await utils.verifyJwtToken(token, config.AUTH.secretKey);
      // Lưu thông tin giã mã được vào đối tượng req, dùng cho các xử lý ở sau
      req.decoded = decoded;
      next();
    } catch (err) {
      // Giải mã gặp lỗi: Không đúng, hết hạn...
      console.error(err);
      return res.status(401).json({
        message: 'Unauthorized access.',
      });
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
};

module.exports= {
    verify
};