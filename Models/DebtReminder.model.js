const db=require('../Utils/database');
const e = require('express');
module.exports={
    detail: stk => db.query(`SELECT a.TenKhachHang, a.SoDienThoai, a.DiaChi 
                            FROM tai_khoan_khach_hang a JOIN tai_khoan_ngan_hang b 
                            ON  a.idTaiKhoanKhachHang=b.idTaiKhoanKhachHang
                            WHERE SoTaiKhoan=${stk}
    `),
    getTaiKhoanThanhToan: STK => db.query("SELECT * FROM tai_khoan_thanh_toan WHERE SoTaiKhoanThanhToan = ?",[STK]),
    getDebtReminderByID: ID => db.query("SELECT * FROM giao_dich_nhac_no WHERE idGiaoDichNhacNo = ?",ID),

    addLichSuNhacNo: entity => db.query("INSERT INTO giao_dich_nhac_no set ?", entity),
    getDebtReminderFromMe: entity => db.query(`SELECT * 
                                        FROM giao_dich_nhac_no 
                                        WHERE SoTaiKhoanNguoiGui = ${entity}
    `),
    getDebtReminderFromOthers: entity => db.query(`SELECT * 
                                        FROM giao_dich_nhac_no 
                                        WHERE SoTaiKhoanNguoiNhan = ${entity}
    `),
    updateDebtReminder: entity => db.query(`UPDATE giao_dich_nhac_no
                                            SET NoiDung = '${entity.NoiDung}', LoaiGiaoDich= '${entity.LoaiGiaoDich}'
                                            WHERE idGiaoDichNhacNo = ${entity.idGiaoDichNhacNo}
    `),
};