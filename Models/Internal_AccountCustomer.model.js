const db=require('../Utils/database');
module.exports={
	getThongTinKhachHang: ID => db.query("SELECT TenKhachHang, GioiTinh, NgaySinh, SoCMND, DiaChi, SoDienThoai, Email, NgheNghiep FROM tai_khoan_khach_hang WHERE idTaiKhoanKhachHang = ?",[ID])
};