const db=require('../../Utils/database');

module.exports={
    all: _ => db.query("SELECT * FROM lich_su_giao_dich"),
    getTransactionByBankName: BankName => db.query(`SELECT * FROM lich_su_giao_dich WHERE TenNganHang= '${BankName.TenNganHang}' AND NgayGiaoDich >="${BankName.NgayBatDau}" AND NgayGiaoDich <= "${BankName.NgayKetThuc}"`),
    getTotalTransactionByBankName: BankName => db.query(`SELECT Sum(SoTien) AS TongGiaoDich FROM lich_su_giao_dich WHERE TenNganHang= '${BankName}'`),
    addEmployee: entity => {db.add(entity, 'tai_khoan_nhan_vien')},
    updateEmployee: entity => db.query("UPDATE tai_khoan_nhan_vien SET ? WHERE TenDangNhap = ? AND TenNganHang = ? AND SoTaiKhoan = ?",[entity,entity.TenDangNhap,entity.SoTaiKhoanNguoiNhan,entity.TenNganHang,entity.SoTaiKhoan]),
    deleteEmployee: TenDangNhap => db.query("DELETE FROM tai_khoan_nhan_vien WHERE TenDangNhap = ?", TenDangNhap),
};