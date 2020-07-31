const db=require('../Utils/database');
module.exports={
	getLichSuGiaoDich: () => db.query("SELECT idLichSuGiaoDich, SoTaiKhoanGiaoDich, NgayGiaoDich, SoTien, NoiDung, GiaoDichVoiSoTK, TenNganHang, LoaiGiaoDich  FROM lich_su_giao_dich"),
	getTaiKhoanThanhToan: () => db.query("SELECT *  FROM tai_khoan_thanh_toan"),
};