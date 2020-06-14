const express = require('express');
const moment=require('moment');

const paymentAccountModel=require('../Models/PaymentAccount.model');
const accountUserModel=require('../Models/AccountUser.model');
const accountBankModel = require('../Models/AccountBank.model');


const config = require('../Config/config.json');

const router = express.Router();

//Them tai khoan khach hang
router.post('/AddUserAccount',async(req,res)=>{
    let payload=req.body;

    // PayLoad={
    //     "TenDangNhap":"xyz3jean",
    //     "MatKhau":"jdjfdtyu",
    //     "Email":"jeantheuser@gmail.com",
    //     "SoDienThoai":"095637815",
    //     "TenKhachHang":"Jean Tran",
    //     "GioiTinh":"Nữ",
    //     "SoCMND":"285647834",
    //     "NgaySinh":"1990-12-19",
    //     "DiaChi":"756 Võ Thị Sáu, Phường 12, Quận Gò Vấp, Tp. Hồ Chí Minh",
    //     "ChiNhanhMo":"25Bank Gò Vấp",
    //     "NgheNghiep":"Nhà báo",
    //     "ChucVu":"",
    //     "GhiChu":""
    // }
    if(payload.TenDangNhap==null)
    {
        return res.status(400).json({
            err: 'Khong the bo trong Ten Dang Nhap' 
        });
    }
    if(payload.MatKhau==null)
    {
        return res.status(400).json({
            err: 'Khong the bo trong Ten Dang Nhap' 
        });
    }
    if(payload.Email==null)
    {
        return res.status(400).json({
            err: 'Khong the bo trong Ten Dang Nhap' 
        });
    }
    if(payload.SoDienThoai==null)
    {
        return res.status(400).json({
            err: 'Khong the bo trong So dien thoai' 
        });
    }
    if(payload.TenKhachHang==null)
    {
        return res.status(400).json({
            err: 'Khong the bo trong ten khach hang' 
        });
    }
    if(payload.GioiTinh==null)
    {
        return res.status(400).json({
            err: 'Khong the bo trong gioi tinh' 
        });
    }
    if(payload.SoCMND==null)
    {
        return res.status(400).json({
            err: 'Khong the bo trong so CMND' 
        });
    }
    if(!moment(payload.NgaySinh,"YYYY-MM-DD").isValid() || payload.NgaySinh==null)
    {
        return res.status(400).json({
            err: 'Ngay sinh bo trong hoac khong phu hop' 
        });
    }
    if(payload.DiaChi==null)
    {
        return res.status(400).json({
            err: 'Khong the bo trong Dia Chi' 
        });
    }
    if(payload.ChiNhanhMo==null)
    {
        return res.status(400).json({
            err: 'Khong the bo trong Chi Nhanh Mo' 
        });
    }
    let rowTaiKhoanKhachHang={
        "TenDangNhap": payload.TenDangNhap,
        "MatKhau": payload.MatKhau,
        "Email": payload.Email,
        "SoDienThoai": payload.SoDienThoai,
        "TenKhachHang": payload.TenKhachHang,
        "GioiTinh": payload.GioiTinh,
        "SoCMND": payload.SoCMND,
        "NgaySinh": payload.NgaySinh,
        "DiaChi": payload.DiaChi,
        "ChiNhanhMo": payload.ChiNhanhMo,
        "NgheNghiep": payload.NgheNghiep,
        "ChucVu": payload.ChucVu,
        "GhiChu":payload.GhiChu
    }

    //console.log(rowTaiKhoanKhachHang);
    let ListTaiKhoanNganHang= await accountBankModel.getSoTaiKhoanNganHang();
    
    var ListSoTaiKhoan=[];
    for (var i=0; i<ListTaiKhoanNganHang.length;i++)
    {
        ListSoTaiKhoan.push(ListTaiKhoanNganHang[i].SoTaiKhoan);
    }

    const SoTaiKhoanMoi=getRandomExcept(100000000,999999999,ListSoTaiKhoan);
    let resultAddTaiKhoanKhachHang= await accountUserModel.addTaiKhoanKhachHang(rowTaiKhoanKhachHang);
    if(resultAddTaiKhoanKhachHang.affectedRows ===0)
        throw new Error("Khong them duoc tai khoan khach hang");
    else{
        let idKhachHang=await accountUserModel.getIdTaiKhoanKhachHangFromCMND(rowTaiKhoanKhachHang.SoCMND);
        //console.log(idTaiKhoanKhachHang);
        let rowTaiKhoanNganHang={
            "SoTaiKhoan":SoTaiKhoanMoi,
            "LoaiTaiKhoan": "thanh toán",
            "idTaiKhoanKhachHang" : idKhachHang[0].idTaiKhoanKhachHang
        }
        let resultAddTaiKhoanNganHang= await accountBankModel.addTaiKhoanNganHang(rowTaiKhoanNganHang);
        if(resultAddTaiKhoanNganHang.affectedRows ===0)
            throw new Error("Khong them duoc tai khoan Ngan Hang");
        let rowTaiKhoanThanhToan={
            "SoTaiKhoanThanhToan":SoTaiKhoanMoi,
            "SoDu":config.BANK.MinimumBalance
        }
        let resultAddTaiKhoanThanhToan= await paymentAccountModel.addTaiKhoanThanhToan(rowTaiKhoanThanhToan);
        if(resultAddTaiKhoanThanhToan.affectedRows ===0)
            throw new Error("Khong them duoc tai khoan Thanh Toan");
    }
    res.json({"reply":"Tao tai khoan thanh cong"});
});
function getRandomExcept(min, max, except) {
    except.sort(function(a, b) {
      return a - b;
    });
    var random = Math.floor(Math.random() * (max - min + 1 - except.length)) + min;
    var i;
    for (i = 0; i < except.length; i++) {
      if (except[i] > random) {
        break;
      }
      random++;
    }
    return random;
  }

module.exports=router;