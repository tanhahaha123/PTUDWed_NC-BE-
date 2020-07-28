const express = require('express');
const moment=require('moment');

const paymentAccountModel=require('../Models/PaymentAccount.model');
const transactionHistoryModel=require('../Models/TransactionHistory.model');


const config = require('../Config/config.json');
const savingAccountModel = require('../Models/SavingAccount.model');

const router = express.Router();
router.get('/',async(req,res)=>{
    let list = await savingAccountModel.all();
    const ret={
        ...list
    }
    res.json(ret);
});
router.get('/detail/:stk',async(req,res)=>{
    if (isNaN(req.params.stk)) {
        return res.status(400).json({
          err: 'Invalid STK.'
        });
      }

    const stk = +req.params.stk || 0;
    let list = await savingAccountModel.getTaiKhoanTietKiem(stk);
    const ret={
        ...list
    }
    res.json(ret);
});
router.post('/UpdateBalance',async(req,res)=>{
    let payload=req.body;
    // let Payload={
    //     "stk":"123123123",
    //     "ThongTinNguoiGui":"Tran Van Dung",
    //     "NoiDung":"",
    //     "TenNganHang":"25Bank Gò Vấp",
    //     "SoTien":10000,
    // };
    if(payload.stk==null)
    {
        return res.status(400).json({
            err:"So tai khoan khong the bo trong"
        });
    }
    if(payload.ThongTinNguoiGui==null)
    {
        return res.status(400).json({
            err:"Thong tin nguoi giao dich khong the bo trong"
        });
    }
    if(isNaN(payload.SoTien)||payload.SoTien==null)
    {
        return res.status(400).json({
            err:"So tien khong hop le hoac bo trong"
        });
    }
    payload.SoTien= +payload.SoTien;
    //kiem tra so tien de lon hay khong
    if(payload.SoTien<config.BANK.MinimumRecieve)
    {
        return res.status(200).json({
            err:"So tien qua it de thuc hien giao dich"
        });
    }
    let TaiKhoanTietKiem=await savingAccountModel.getTaiKhoanTietKiem(payload.stk);
    console.log(TaiKhoanTietKiem);
    if(TaiKhoanTietKiem.length===0)
    {
        return res.status(400).json({
            err: 'Khong tim thay so tai khoan'
        })
    }
    
    const soDuHienTai= +TaiKhoanTietKiem[0].SoDu;
    const SoDuMoi=soDuHienTai+payload.SoTien-config.BANK.InternalFee;
    let resultUpdate=await savingAccountModel.updateSoDu_tkTietKiem(payload.stk,SoDuMoi);
    // console.log(payload.stk);
    // console.log(soDuHienTai);
    // console.log(SoDuMoi);
    if (resultUpdate.affectedRows===0) 
        return res.status(503).json({
        err: 'Service Unavailable'
    });
    else
    {
        const ts = moment().valueOf();
        let rowLichSuGiaoDich={
            "MaGiaoDich": payload.stk+'_'+ts,
            "SoTaiKhoanGiaoDich": payload.stk,
            "NgayGiaoDich": moment().format("YYYY-MM-DD HH:mm:ss.SSS"), //thời điểm hiện tại
            "SoTien": payload.SoTien,
            "NoiDung": payload.NoiDung,
            "ThongTinNguoiGui": payload.ThongTinNguoiGui,
            "LienNganHang": 0,
            "TenNganHang": payload.DestinationBankName,
            "LoaiGiaoDich": "nhận tiền"
        }
        let resultAdd = await transactionHistoryModel.addLichSuGiaoDich(rowLichSuGiaoDich);
                if (resultAdd.affectedRows===0) throw new Error("Khong them duoc lich su giao dich, MaGiaoDich = "+rowLichSuGiaoDich.MaGiaoDich);
    }
    res.json({"reply":"Cap nhat thanh cong"});
});


module.exports=router;