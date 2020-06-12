const db=require('../Utils/database');
module.exports={
    detail: stk => db.query(`SELECT a.TenKhachHang, a.SoDienThoai, a.DiaChi 
                            FROM tai_khoan_khach_hang a JOIN tai_khoan_ngan_hang b 
                            ON  a.idTaiKhoanKhachHang=b.idTaiKhoanKhachHang
                            WHERE SoTaiKhoan=${stk}`),
    getTaiKhoanThanhToan: STK => db.query("SELECT * FROM tai_khoan_thanh_toan WHERE SoTaiKhoanThanhToan = ?",[STK]),
    addLichSuNhacNo: entity => db.query("INSERT INTO giao_dich_nhac_no set ?", entity),
};