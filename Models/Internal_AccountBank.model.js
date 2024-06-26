const db=require('../Utils/database');
module.exports={
	getThongTinNguoiNhan: STK => db.query("SELECT TenGoiNho, SoTaiKhoanNguoiNhan, TenNganHang FROM danh_sach_nguoi_nhan WHERE SoTaiKhoan = ?",[STK]),
	getTenDangKy: STK => db.query("SELECT y.TenKhachHang FROM tai_khoan_ngan_hang x, tai_khoan_khach_hang y WHERE x.SoTaiKhoan = ? AND x.idTaiKhoanKhachHang = y.idTaiKhoanKhachHang AND x.LoaiTaiKhoan = 'thanh toán'",[STK]),
	addThongTinNguoiNhan: entity => db.query("INSERT INTO danh_sach_nguoi_nhan SET ?", entity),
	updateThongTinNguoiNhan: entity => db.query("UPDATE danh_sach_nguoi_nhan SET ? WHERE (TenGoiNho = ? OR SoTaiKhoanNguoiNhan = ?) AND TenNganHang = ? AND SoTaiKhoan = ?",[entity,entity.TenGoiNho,entity.SoTaiKhoanNguoiNhan,entity.TenNganHang,entity.SoTaiKhoan]),
    deleteThongTinNguoiNhan: (STK1,STK2) => db.query("DELETE FROM danh_sach_nguoi_nhan WHERE SoTaiKhoanNguoiNhan = ? AND SoTaiKhoan = ?", [STK1,STK2]),
    getTaiKhoanThanhToan: STK => db.query("SELECT * FROM tai_khoan_thanh_toan WHERE SoTaiKhoanThanhToan = ?", STK),
    updateSoDu: (STK,Amount) => db.query("UPDATE tai_khoan_thanh_toan SET SoDu = ? WHERE SoTaiKhoanThanhToan = ?",[Amount,STK]),
    addLichSuGiaoDich: entity => db.query("INSERT INTO lich_su_giao_dich set ?", entity),
    deleteOTPCode: STK => db.query("DELETE FROM otp_code WHERE SoTaiKhoan = ?", STK),
    addOTPCode: entity => db.query("INSERT INTO otp_code set ?", entity),
    getOTPCode: (STK,OTPCode) => db.query("SELECT * FROM otp_code WHERE SoTaiKhoan = ? AND OTPCode = ?", [STK,OTPCode]),
    getKhachHang: STK => db.query("SELECT y.* FROM tai_khoan_ngan_hang x, tai_khoan_khach_hang y WHERE x.SoTaiKhoan = ? AND x.idTaiKhoanKhachHang = y.idTaiKhoanKhachHang AND x.LoaiTaiKhoan = 'thanh toán'",[STK]),
    getNganHangLienKet: BankName => db.query("SELECT * FROM ngan_hang_lien_ket WHERE TenNganHang = ?", BankName),
    getGiaoDichNhacNo: (ID, STK1, STK2,TinhTrangXuLy) => db.query("SELECT * FROM giao_dich_nhac_no WHERE MaGiaoDichNhacNo = ? AND ((SoTaiKhoanNguoiGui= ? AND SoTaiKhoanNguoiNhan = ?) OR (SoTaiKhoanNguoiGui= ? AND SoTaiKhoanNguoiNhan = ?)) AND TinhTrangXuLy = ?", [ID,STK1,STK2,STK2,STK1,TinhTrangXuLy]),
    updateTinhTrangXuLy: (ID) => db.query("UPDATE giao_dich_nhac_no SET TinhTrangXuLy = 1 WHERE MaGiaoDichNhacNo = ?",ID),
    addGiaoDichNhacNo: entity => db.query("INSERT INTO giao_dich_nhac_no set ?", entity),
    checkThongTinNguoiNhan: entity => db.query("SELECT * FROM danh_sach_nguoi_nhan WHERE (TenGoiNho = ? OR SoTaiKhoanNguoiNhan = ?) AND TenNganHang = ? AND SoTaiKhoan = ?",[entity.TenGoiNho,entity.SoTaiKhoanNguoiNhan,entity.TenNganHang,entity.MyAccountNumber]),
    getLichSuNhacNo: STK => db.query("SELECT * FROM giao_dich_nhac_no WHERE SoTaiKhoanNguoiGui= ? OR SoTaiKhoanNguoiNhan = ?",[STK,STK]),
    getNhacNoChuaThanhToan: STK => db.query("SELECT * FROM giao_dich_nhac_no WHERE SoTaiKhoanNguoiNhan = ? AND TinhTrangXuLy = 0",[STK]),
    getNhacNoDaTao: STK => db.query("SELECT * FROM giao_dich_nhac_no WHERE SoTaiKhoanNguoiGui = ? AND TinhTrangXuLy = 0",[STK])
};