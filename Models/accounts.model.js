const db=require('../Utils/database');
module.exports={
    allTKTT: _ => db.load(`SELECT *
                       FROM tai_khoan_ngan_hang a LEFT JOIN tai_khoan_thanh_toan b
                       ON a.SoTaiKhoan = b.SoTaiKhoanThanhToan`),
    allTKTK: _ => db.load(`SELECT * 
                        FROM tai_khoan_ngan_hang a LEFT JOIN tai_khoan_tiet_kiem b
                        ON a.SoTaiKhoan = b.SoTaiKhoanTietKiem`),                   
    detailTKTT: stk => db.load(`SELECT * 
                        FROM tai_khoan_ngan_hang a JOIN tai_khoan_thanh_toan b  
                        ON  a.SoTaiKhoan=b.SoTaiKhoanThanhToan 
                        WHERE a.SoTaiKhoan=${stk}`),
    detailTKTK: stk => db.load(`SELECT * 
                        FROM tai_khoan_ngan_hang a JOIN tai_khoan_tiet_kiem b  
                        ON  a.SoTaiKhoan=b.SoTaiKhoanTietKiem 
                        WHERE a.SoTaiKhoan=${stk}`), 
    getNganHangLienKet: tennganhang => db.load(`SELECT *
                        FROM ngan_hang_liet_ket a
                        WHERE a.TenNganHang='${tennganhang}'`),
    exchangeA: (stk, totalExchangeA) => db.load(`UPDATE tai_khoan_thanh_toan 
                                                SET SoDu = SoDu -${totalExchangeA} 
                                                WHERE SoTaiKhoanThanhToan= ${stk}`),
    exchangeB: (stk, totalExchangeB) => db.load(`UPDATE tai_khoan_thanh_toan 
                                                SET SoDu = SoDu +${totalExchangeB} 
                                                WHERE SoTaiKhoanThanhToan= ${stk}`),
    updateHistory: entity =>db.add(entity, `lich_su_giao_dich`),
    // {
    //     entity= [
    //         {
    //             "SoTaiKhoanGiaoDich": "123123123",
    //             "NgayGiaoDich": "2020/1/1",
    //             "SoTien": 500,
    //             "NoiDung": "A chuyen tien B",
    //             "SoTaiKhoanNguoiGui": "",
    //             "ThongTinNguoiGui": "Nhan vien A chuyen tien",
    //             "LienNganHang": 0,
    //             "TenNganHang": "",
    //             "LoaiGiaoDich": "nhận tiền"
    //         }
    //     ]
    // }
};