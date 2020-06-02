const db=require('../Utils/database');
module.exports={
	getTaiKhoanThanhToan: STK => db.query("SELECT * FROM tai_khoan_thanh_toan WHERE SoTaiKhoanThanhToan = ?",[STK]),
	updateSoDu: (STK,Amount) => db.query("UPDATE tai_khoan_thanh_toan SET SoDu = ? WHERE SoTaiKhoanThanhToan = ?",[Amount,STK]),
	addLichSuGiaoDich: entity => db.query("INSERT INTO lich_su_giao_dich set ?", entity),
    checkBankPartner: BankName => db.query(`SELECT * FROM ngan_hang_liet_ket WHERE TenNganHang = '${BankName}'`)
};