const db=require('../../Utils/database');
module.exports={
    deleteRefreshToken: (ID) => db.query("DELETE FROM refresh_token WHERE idTaiKhoanKhachHang = ?", [ID]),
    addRefreshToken: entity => db.query("INSERT INTO refresh_token set ?", entity),
    getRefreshToken: (ID,Token) => db.query("SELECT * FROM refresh_token WHERE idTaiKhoanKhachHang = ? AND RefreshToken = ?", [ID,Token])
};