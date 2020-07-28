const db=require('../Utils/database');
module.exports={
	getThongTinKhachHang: ID => db.query("SELECT TenKhachHang, GioiTinh, NgaySinh, SoCMND, DiaChi, SoDienThoai, Email, NgheNghiep FROM tai_khoan_khach_hang WHERE idTaiKhoanKhachHang = ?",[ID]),
	getTaiKhoanNganHang: ID => db.query("SELECT * FROM tai_khoan_ngan_hang WHERE idTaiKhoanKhachHang = ?",[ID]),
	getTaiKhoanThanhToan: ID => db.query("SELECT * FROM tai_khoan_ngan_hang WHERE idTaiKhoanKhachHang = ? AND LoaiTaiKhoan = 'thanh toán'",[ID]),
	getTaiKhoanTietKiem: ID => db.query("SELECT * FROM tai_khoan_ngan_hang WHERE idTaiKhoanKhachHang = ? AND LoaiTaiKhoan = 'tiết kiệm'",[ID]),
	getUsername: ID => db.query("SELECT TenDangNhap FROM tai_khoan_khach_hang WHERE idTaiKhoanKhachHang = ?",[ID]),
	getBankPartner: ID => db.query("SELECT * FROM ngan_hang_lien_ket")
};