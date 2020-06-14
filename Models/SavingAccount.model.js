const db=require('../Utils/database');
module.exports={
    all: _ => db.query("SELECT * FROM tai_khoan_tiet_kiem"),
    addTaiKhoanThanhToan:entity => db.query("INSERT INTO tai_khoan_thanh_toan set ?", entity),
    getTaiKhoanTietKiem: STK => db.query("SELECT * FROM tai_khoan_tiet_kiem WHERE SoTaiKhoanTietKiem = ?",[STK]),
    updateSoDu_tkTietKiem: (STK,Amount) => db.query("UPDATE tai_khoan_tiet_kiem SET SoDu = ? WHERE SoTaiKhoanTietKiem = ?",[Amount,STK])
};