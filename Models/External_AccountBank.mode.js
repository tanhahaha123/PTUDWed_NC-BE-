const db=require('../Utils/database');
module.exports={
	getTaiKhoanThanhToan: STK => db.query("SELECT * FROM tai_khoan_thanh_toan WHERE SoTaiKhoanThanhToan = ?",[STK]),
    checkBankPartner: BankName => db.query(`SELECT * FROM ngan_hang_liet_ket WHERE TenNganHang = '${BankName}'`)
};