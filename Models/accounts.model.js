const db=require('../utils/database');
module.exports={
    all: _ => db.load(`select * from tai_khoan`),
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