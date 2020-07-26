const db=require('../Utils/database');
module.exports={
    getGiaoDich: stkgd=>db.query(`SELECT * FROM lich_su_giao_dich 
                                        WHERE SoTaiKhoanGiaoDich = ${stkgd} 
                                        ORDER BY NgayGiaoDich`),
    getGiaoDichNhanTien: stkgd=>db.query(`SELECT * FROM lich_su_giao_dich 
                                        WHERE SoTaiKhoanGiaoDich = ${stkgd} AND LoaiGiaoDich = 'nhận tiền'
                                        ORDER BY NgayGiaoDich`),
    getGiaoDichChuyenKhoan: stkgd=>db.query(`SELECT * FROM lich_su_giao_dich 
                                            WHERE SoTaiKhoanGiaoDich = ${stkgd} AND LoaiGiaoDich = 'chuyển khoản'
                                            ORDER BY NgayGiaoDich`),
    getGiaoDichThanhToanNhacNo: stkgd=>db.query(`SELECT * FROM giao_dich_nhac_no 
                                                WHERE SoTaiKhoanNguoiGui = ${stkgd} OR SoTaiKhoanNguoiNhan = ${stkgd}
                                                ORDER BY NgayGiaoDich`),
    addLichSuGiaoDich: entity => db.query("INSERT INTO lich_su_giao_dich set ?", entity)
};