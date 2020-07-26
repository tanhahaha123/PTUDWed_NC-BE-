const db=require('../Utils/database');
module.exports={
    queryAccountBankNumberFromPartner: STK => db.query(`SELECT y.TenKhachHang, y.SoDienThoai, y.GioiTinh, y.SoCMND, y.NgaySinh, y.DiaChi, x.LoaiTaiKhoan FROM tai_khoan_ngan_hang x, tai_khoan_khach_hang y WHERE x.SoTaiKhoan = ${STK} AND x.idTaiKhoanKhachHang = y.idTaiKhoanKhachHang`),
    all: _ => db.query(`select tai_khoan_khach_hang.*, tai_khoan_ngan_hang. from tai_khoan_ngan_hang`),
    showAllAccounts: stk=> db.query(`SELECT * FROM tai_khoan_ngan_hang WHERE idTaiKhoanKhachHang= '${stk}'`),
    getThongTinTaiKhoan:stk=>db.query(`SELECT * FROM tai_khoan_ngan_hang WHERE SoTaiKhoan= '${stk}'`),
    addTaiKhoanNganHang:entity => db.query("INSERT INTO tai_khoan_ngan_hang set ?", entity),
    getSoTaiKhoanNganHang: _ => db.query(`SELECT SoTaiKhoan FROM tai_khoan_ngan_hang`)
};