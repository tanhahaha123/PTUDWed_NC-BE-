const db=require('../../Utils/database');

module.exports={
    all: _ => db.query("SELECT * FROM lich_su_giao_dich"),
    getTransactionByBankName: BankName => db.query(`SELECT * FROM lich_su_giao_dich WHERE TenNganHang= '${BankName.TenNganHang}' AND NgayGiaoDich >="${BankName.NgayBatDau}" AND NgayGiaoDich <= "${BankName.NgayKetThuc}"`),
    getTotalRevenueByBankName: _ => db.query(`SELECT TenNganHang, SUM(SoTien) as Total FROM lich_su_giao_dich WHERE LienNganHang = 1 GROUP BY TenNganHang`),
    addEmployee: entity => {db.add(entity, 'tai_khoan_nhan_vien')},
    updateEmployee: entity => db.query("UPDATE tai_khoan_nhan_vien SET ? WHERE TenDangNhap = ? AND TenNganHang = ? AND SoTaiKhoan = ?",[entity,entity.TenDangNhap,entity.SoTaiKhoanNguoiNhan,entity.TenNganHang,entity.SoTaiKhoan]),
    deleteEmployee: TenDangNhap => db.query("DELETE FROM tai_khoan_nhan_vien WHERE TenDangNhap = ?", TenDangNhap),
    getTotalTransactionByYear: _ => db.query(`SELECT YEAR(a.NgayGiaoDich) as year, SUM(SoTien) as total FROM lich_su_giao_dich a GROUP BY YEAR(a.NgayGiaoDich)`),
    getTotalTransactionByMonth: _ => db.query(`SELECT MONTH(a.NgayGiaoDich) as month, SUM(SoTien) as total FROM lich_su_giao_dich a WHERE YEAR(a.NgayGiaoDich) = 2020 GROUP BY MONTH(a.NgayGiaoDich)`)
};