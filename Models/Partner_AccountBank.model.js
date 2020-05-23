const db=require('../utils/database');
module.exports={
    getThongTinTaiKhoan: STK => db.query(`SELECT y.TenKhachHang, y.GioiTinh, x.LoaiTaiKhoan FROM tai_khoan_ngan_hang x, tai_khoan_khach_hang y WHERE x.SoTaiKhoan = ${STK} AND x.idTaiKhoanKhachHang = y.idTaiKhoanKhachHang`),
    getTaiKhoanThanhToan: STK => db.query("SELECT * FROM tai_khoan_thanh_toan WHERE SoTaiKhoanThanhToan = ?",[STK]),
    updateSoDu: (STK,Amount) => db.query("UPDATE tai_khoan_thanh_toan SET SoDu = ? WHERE SoTaiKhoanThanhToan = ?",[Amount,STK]),
    addLichSuGiaoDich: entity => db.query("INSERT INTO lich_su_giao_dich set ?", entity),
    checkBankPartner: BankName => db.query(`SELECT * FROM ngan_hang_liet_ket WHERE TenNganHang = '${BankName}'`)
};