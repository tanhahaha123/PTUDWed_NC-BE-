const db=require('../utils/database');
module.exports={
    all: _ => db.load(`select * from tai_khoan`),
    detail: stk => db.load(`select * from taikhoan where SoTaiKhoan=${stk}`),
    add: entity => {
        // entity = {
        //   "TKNguon": "123",
        //   "TKDich": "456",
        //   "SoTien": "100000",
        //   "NoiDung": " A Chuyen tien den B",
        //   "ThanhToanPhi": "A",
        // }
        return db.add(entity, 'giaodich');
    },
    exchangeA: (stk, totalExchangeA) => db.load(`UPDATE taikhoan SET SoDuHienTai= SoDuHienTai -${totalExchangeA} WHERE SoTaiKhoan= ${stk}`),
    exchangeB: (stk, totalExchangeB) => db.load(`UPDATE taikhoan SET SoDuHienTai= SoDuHienTai +${totalExchangeB} WHERE SoTaiKhoan= ${stk}`)
};