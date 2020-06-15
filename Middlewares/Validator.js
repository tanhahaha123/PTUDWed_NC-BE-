const { body, validationResult, check } = require('express-validator')
const userSignInValidationRules = () => {
  return [
    // username must be an email
    body('TenDangNhap', 'Tên đăng nhập không được để trống').notEmpty(),
    // password must be at least 5 chars long
    body('MatKhau', 'Vui lòng nhập mật khẩu').notEmpty(),
  ]
};

const changePasswordValidationRules = (req, res) => {
  console.log("HERE: ChangePass")
  return [
    // Tên đăng nhập rỗng
    body('TenDangNhap', 'Tên đăng nhập không được để trống').notEmpty(),
    // Mật khẩu cũ rỗng
    body('MatKhauCu', 'Vui lòng nhập mật khẩu').notEmpty(),
    //Mật khẩu mới rỗng
    body('MatKhauMoi')
    .notEmpty()
    .withMessage('Vui lòng nhập mật khẩu mới'),
    body('XacNhanMatKhau')
    .notEmpty()
    .withMessage('Vui lòng nhập xác nhận mật khẩu')
  ]
}

//
// ─────── CHECK FOR ERRORS ─────
//
const validate = (req, res, next) => {
  console.log("HERE: Validate");
  // Lấy tất cả các lỗi
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    console.log("Validate1");
    return next()
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  console.log("Validate2");
  return res.status(422).json({
    
    errors: extractedErrors,
  })
}

module.exports = {
  userSignInValidationRules,
  changePasswordValidationRules,
  validate,
}