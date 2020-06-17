const db=require('../Utils/database');
module.exports={
	getThongTinNguoiNhan: STK => db.query("SELECT TenGoiNho, SoTaiKhoanNguoiNhan, TenNganHang FROM danh_sach_nguoi_nhan WHERE SoTaiKhoan = ?",[STK]),
	getTenDangKy: STK => db.query("SELECT y.TenKhachHang FROM tai_khoan_ngan_hang x, tai_khoan_khach_hang y WHERE x.SoTaiKhoan = ? AND x.idTaiKhoanKhachHang = y.idTaiKhoanKhachHang AND x.LoaiTaiKhoan = 'thanh toán'",[STK]),
	addThongTinNguoiNhan: entity => db.query("INSERT INTO danh_sach_nguoi_nhan SET ?", entity),
	updateThongTinNguoiNhan: entity => db.query("UPDATE danh_sach_nguoi_nhan SET ? WHERE (TenGoiNho = ? OR SoTaiKhoanNguoiNhan = ?) AND TenNganHang = ? AND SoTaiKhoan = ?",[entity,entity.TenGoiNho,entity.SoTaiKhoanNguoiNhan,entity.TenNganHang,entity.SoTaiKhoan]),
    deleteThongTinNguoiNhan: STK => db.query("DELETE FROM danh_sach_nguoi_nhan WHERE SoTaiKhoanNguoiNhan = ?", STK)
};