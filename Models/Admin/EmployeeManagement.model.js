const db=require('../../Utils/database');

module.exports={
    all: _ => db.query("SELECT * FROM tai_khoan_nhan_vien WHERE DeletedAt IS NULL"),
    getEmployeeByID: ID => db.query(`SELECT * FROM tai_khoan_nhan_vien WHERE idTaiKhoanNhanVien= ${ID}`),
    checkTenDangNhap: entity => db.query(`SELECT * FROM tai_khoan_nhan_vien WHERE TenDangNhap= '${entity}'`),
    checkEmail: entity => db.query(`SELECT * FROM tai_khoan_nhan_vien WHERE Email= '${entity}'`),
    checkSoCMND: entity => db.query(`SELECT * FROM tai_khoan_nhan_vien WHERE SoCMND= '${entity}'`),
    addEmployee: entity => {db.add(entity, 'tai_khoan_nhan_vien')},
    updateEmployee: entity => db.query("UPDATE tai_khoan_nhan_vien SET ? WHERE TenDangNhap = ? AND TenNganHang = ? AND SoTaiKhoan = ?",[entity,entity.TenDangNhap,entity.SoTaiKhoanNguoiNhan,entity.TenNganHang,entity.SoTaiKhoan]),
    deleteEmployee: entity => db.query("UPDATE tai_khoan_nhan_vien SET DeletedAt = ? WHERE TenDangNhap = ?", [entity.DeletedAt, entity.TenDangNhap]),
};