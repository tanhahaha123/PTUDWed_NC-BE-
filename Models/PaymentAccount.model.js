const db=require('../Utils/database');
module.exports={
    all: _ => db.query("SELECT * FROM tai_khoan_thanh_toan"),
    addTaiKhoanThanhToan:entity => db.query("INSERT INTO tai_khoan_thanh_toan set ?", entity),
    getTaiKhoanThanhToan: STK => db.query("SELECT * FROM tai_khoan_thanh_toan WHERE SoTaiKhoanThanhToan = ?",[STK]),
    updateSoDu_tkThanhToan: (STK,Amount) => db.query("UPDATE tai_khoan_thanh_toan SET SoDu = ? WHERE SoTaiKhoanThanhToan = ?",[Amount,STK])
};