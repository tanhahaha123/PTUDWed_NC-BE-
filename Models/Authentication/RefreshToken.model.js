const db=require('../../Utils/database');
module.exports={
    deleteRefreshToken: (ID) => db.query("DELETE FROM refresh_token WHERE idTaiKhoanKhachHang = ?", [ID]),
    addRefreshToken: entity => db.query("INSERT INTO refresh_token set ?", entity),
    getRefreshToken: (ID,Token) => db.query("SELECT * FROM refresh_token WHERE idTaiKhoanKhachHang = ? AND RefreshToken = ?", [ID,Token]),
    deleteRefreshTokenEmployee: (ID) => db.query("DELETE FROM refresh_token_employee WHERE idTaiKhoanNhanVien = ?", [ID]),
    addRefreshTokenEmployee: entity => db.query("INSERT INTO refresh_token_employee set ?", entity),
    getRefreshTokenEmployee: (ID,Token) => db.query("SELECT * FROM refresh_token_employee WHERE idTaiKhoanNhanVien = ? AND RefreshToken = ?", [ID,Token])
};