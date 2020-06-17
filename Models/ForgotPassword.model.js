const db=require('../Utils/database');
module.exports={
    deleteForgotPasswordOTPCode: (TenDangNhap,Email) => db.query("DELETE FROM forgot_password_otp_code WHERE TenDangNhap = ? AND Email = ?", [TenDangNhap,Email]),
    addForgotPasswordOTPCode: entity => db.query("INSERT INTO forgot_password_otp_code set ?", entity),
    getForgotPasswordOTPCode: (TenDangNhap,Email,OTPCode) => db.query("SELECT * FROM forgot_password_otp_code WHERE TenDangNhap = ? AND Email = ? AND OTPCode = ?", [TenDangNhap,Email,OTPCode]),
    getKhachHang: (TenDangNhap,Email) => db.query("SELECT * FROM tai_khoan_khach_hang WHERE TenDangNhap = ? AND Email = ?", [TenDangNhap,Email]),
    updatePassword: (TenDangNhap,Email,MatKhau) => db.query("UPDATE tai_khoan_khach_hang SET MatKhau = ? WHERE TenDangNhap = ? AND Email = ?",[MatKhau,TenDangNhap,Email])
};