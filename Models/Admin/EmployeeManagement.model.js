const db=require('../../Utils/database');

module.exports={
    all: _ => db.query("SELECT * FROM tai_khoan_nhan_vien"),
    getEmployeeByID: ID => db.query(`SELECT * FROM tai_khoan_nhan_vien WHERE idTaiKhoanNhanVien= ${ID}`),
    addEmployee: entity => {db.add(entity, 'tai_khoan_nhan_vien')},
    updateEmployee: entity => db.query("UPDATE tai_khoan_nhan_vien SET ? WHERE TenDangNhap = ? AND TenNganHang = ? AND SoTaiKhoan = ?",[entity,entity.TenDangNhap,entity.SoTaiKhoanNguoiNhan,entity.TenNganHang,entity.SoTaiKhoan]),
    deleteEmployee: TenDangNhap => db.query("DELETE FROM tai_khoan_nhan_vien WHERE TenDangNhap = ?", TenDangNhap),
};