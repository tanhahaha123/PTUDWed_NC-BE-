const db=require('../Utils/database');
module.exports={
    queryAccountBankNumberFromPartner: STK => db.load(`SELECT y.TenKhachHang, y.SoDienThoai, y.GioiTinh, y.SoCMND, y.NgaySinh, y.DiaChi, x.LoaiTaiKhoan FROM tai_khoan_ngan_hang x, tai_khoan_khach_hang y WHERE x.SoTaiKhoan = ${STK} AND x.idTaiKhoanKhachHang = y.idTaiKhoanKhachHang`),
    all: _ => db.load(`select tai_khoan_khach_hang.*, tai_khoan_ngan_hang. from tai_khoan_ngan_hang`),
    detail: stk => db.load(`select * from tai_khoan where id_tk=${stk}`),
    // add: entity => {
    //     // entity = {
    //     //   "TKNguon": "123",
    //     //   "TKDich": "456",
    //     //   "SoTien": "100000",
    //     //   "NoiDung": " A Chuyen tien den B",
    //     //   "ThanhToanPhi": "A",
    //     // }
    //     return db.add(entity, 'giaodich');
    // },
    exchangeA: (stk, totalExchangeA) => db.load(`UPDATE tai_khoan SET so_du = so_du -${totalExchangeA} WHERE id_tk= ${stk}`),
    exchangeB: (stk, totalExchangeB) => db.load(`UPDATE tai_khoan SET so_du = so_du +${totalExchangeB} WHERE id_tk= ${stk}`)
};