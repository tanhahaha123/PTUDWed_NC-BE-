const bcrypt = require('bcryptjs');
const db = require('../../Utils/database');
const signUpModel = require('./SignUp.model');

module.exports = {
  login: async entity => {
    // entity = {
    //   "TenDangNhap": "MyAccount",
    //   "MatKhau": "123456",
    // }
    
    // entity = {
    //   "TenDangNhap": "myaccount1@gmail.com",
    //   "MatKhau": "123456",
    // }

    const rows = await signUpModel.singleByUserName(entity.TenDangNhap);
    if (rows.length === 0)
      //Khong co tai khoan
      return null;
    

    // Da co tai khoan
    const hashPwd = rows[0].MatKhau;
    if (bcrypt.compareSync(entity.MatKhau, hashPwd)) {
      //Dung mat khau
      return rows[0];
    }

    return null;
  },
  changePassword: async entity =>{
    const rows = await signUpModel.singleByUserName(entity.TenDangNhap);
    if (rows.length === 0)
      //Khong co tai khoan
      return null;
      
    // Da co tai khoan
    const hashPwd = rows[0].MatKhau;
    if (bcrypt.compareSync(entity.MatKhauCu, hashPwd)) {
      // const hash = bcrypt.hashSync(entity.MatKhauMoi, 8);
      // entity.MatKhauMoi = hash;
      console.log(entity.TenDangNhap);
      signUpModel.changePassword(entity);
      
      const rowsChange = await signUpModel.singleByUserName(entity.TenDangNhap);
      console.log(rowsChange[0]);
    }
  }
};