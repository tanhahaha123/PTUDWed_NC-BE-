const bcrypt = require('bcryptjs');
const db = require('../../Utils/database');

module.exports = {
  add: entity => {
    // entity = {
    //   "TenDangNhap": "myaccount4",
    //   "MatKhau": "123456",
    //   "Email": "myaccount@gmail.com",
    //   "SoDienThoai": "0123456789",
    //   "TenKhachHang": "Nguyen Cong Phuong",
    //   "GioiTinh": "Nam",
    //   "SoCMND": "212810156",
    //   "NgaySinh": "2020/2/2",
    //   "DiaChi": "Quang Ngai",
    //   "ChiNhanhMo": "abc"
    //   }
    const hash = bcrypt.hashSync(entity.MatKhau, 8);
    entity.MatKhau = hash;
    return db.add(entity, 'tai_khoan_khach_hang');
  },

  singleByUserName: TenDangNhap => db.load(`select * from tai_khoan_khach_hang a JOIN tai_khoan_ngan_hang b
                                            ON a.idTaiKhoanKhachHang=b.idTaiKhoanKhachHang  
                                            where TenDangNhap = '${TenDangNhap}' OR Email = '${TenDangNhap}'`),
  singleAdminByUserName: TenDangNhap => db.load(`select * from tai_khoan_nhan_vien
                                            where TenDangNhap = '${TenDangNhap}' OR Email = '${TenDangNhap}'`),
  changePassword: entity => db.load(`UPDATE tai_khoan_khach_hang
                                    SET MatKhau='${entity.MatKhauMoi}'
                                    WHERE TenDangNhap='${entity.TenDangNhap}' OR Email='${entity.TenDangNhap}'`)
};