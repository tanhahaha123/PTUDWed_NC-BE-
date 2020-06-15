const db=require('../Utils/database');
module.exports={
    all: _ => db.query("SELECT * FROM tai_khoan_khach_hang"),
    addTaiKhoanKhachHang: entity => db.query("INSERT INTO tai_khoan_khach_hang set ?", entity),
    getIdTaiKhoanKhachHangFromCMND: soCMND=> db.query(`SELECT idTaiKhoanKhachHang FROM tai_khoan_khach_hang WHERE SoCMND='${soCMND}'`)
};