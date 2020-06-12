const db=require('../Utils/database');
module.exports={
    queryAccountBankNumberFromPartner: STK => db.query(`SELECT y.TenKhachHang, y.SoDienThoai, y.GioiTinh, y.SoCMND, y.NgaySinh, y.DiaChi, x.LoaiTaiKhoan FROM tai_khoan_ngan_hang x, tai_khoan_khach_hang y WHERE x.SoTaiKhoan = ${STK} AND x.idTaiKhoanKhachHang = y.idTaiKhoanKhachHang`),
    all: _ => db.query(`select tai_khoan_khach_hang.*, tai_khoan_ngan_hang. from tai_khoan_ngan_hang`),
    detail: stk => db.query(`select * from tai_khoan where id_tk=${stk}`),
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
    exchangeA: (stk, totalExchangeA) => db.query(`UPDATE tai_khoan SET so_du = so_du -${totalExchangeA} WHERE id_tk= ${stk}`),
    exchangeB: (stk, totalExchangeB) => db.query(`UPDATE tai_khoan SET so_du = so_du +${totalExchangeB} WHERE id_tk= ${stk}`),
    showAllAccounts: stk=> db.query(`SELECT * FROM tai_khoan_ngan_hang WHERE idTaiKhoanKhachHang= '${stk}'`)
};