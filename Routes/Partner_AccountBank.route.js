const express = require('express');
const moment = require('moment');

const config = require('../Config/config.json');
const Partner_AccountBankModel = require('../Models/Partner_AccountBank.model');
const DecryptAndVerfify = require('../Middlewares/DecryptAndVerify.mdw');


const router = express.Router();

//Ngân hàng liên kết truy vấn thông tin tài khoản
router.get('/destination-account', DecryptAndVerfify, async (req, res) => {
    let payload = req.MyPayload;

    // payload = {
    //     "BankName":".....",
    //     "DestinationAccountNumber":258258258
    //     "iat":1590110627616
    // }

    let STK = payload.DestinationAccountNumber;
    let BankName = payload.BankName;

    if (BankName == null){
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường BankName'
        });     
    }
    if (isNaN(STK) || (STK == null)){
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường DestinationAccountNumber'
        });     
    }
    if (isNaN(payload.iat) || (payload.iat == null)){
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường iat'
        });     
    }

    STK = +STK;
    payload.iat = +payload.iat;

    if (moment().diff(moment(payload.iat),'seconds') > config.PARTNER.ExpiredTime) { //thời gian tạo request iat quá 5 phút so với hiện tại
        return res.status(408).json({
            err: 'request expired ('+config.PARTNER.ExpiredTime/60+'min)'
        })
    }

    let data = await Partner_AccountBankModel.getThongTinTaiKhoan(STK);
    if (data.length===0) return res.status(204).end({});
    res.json(data[0]);
});

//Nạp tiền vào tài khoản từ ngân hàng liên kết
router.post('/destination-account/recharge', DecryptAndVerfify, async (req, res) => {
    let payload = req.MyPayload;

    // payload = {
    //     "BankName":"AGRIBANK",
    //     "SourceAccountNumber":102102102,
    //     "SourceAccountName":"Nguyễn Thanh Nam",
    //     "DestinationAccountNumber":258258258,
    //     "Amount":1250000, //1 triệu 2 trăm 50 nghìn
    //     "Message":"thanh toán tiền phòng",
    //     "iat":1589881212570
    // }

    if (payload.BankName == null){
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường BankName, không được bỏ trống'
        });     
    }

    if (isNaN(payload.SourceAccountNumber) || (payload.SourceAccountNumber == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường SourceAccountNumber, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.SourceAccountName == null){
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại SourceAccountName, không được bỏ trống'
        });     
    }

    if (isNaN(payload.DestinationAccountNumber) || (payload.DestinationAccountNumber == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường DestinationAccountNumber, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (isNaN(payload.Amount) || (payload.Amount == null) || (+payload.Amount <=0)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Amount, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.Message == null){
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Message, không được bỏ trống'
        });     
    }

    if (isNaN(payload.iat) || (payload.iat == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường iat, sai định dạng hoặc đang bỏ trống'
        });
    }

    //parse from string to number
    payload.DestinationAccountNumber = +payload.DestinationAccountNumber;
    payload.SourceAccountNumber = +payload.SourceAccountNumber;
    payload.Amount = +payload.Amount;
    payload.iat = +payload.iat;

    if (moment().diff(moment(payload.iat),'seconds') > config.PARTNER.ExpiredTime) { //thời gian tạo request iat quá 5 phút so với hiện tại
        return res.status(408).json({
            err: 'request expired ('+config.PARTNER.ExpiredTime/60+'min)'
        })
    }

    let TaiKhoanThanhToanDich = await Partner_AccountBankModel.getTaiKhoanThanhToan(payload.DestinationAccountNumber);
    if (TaiKhoanThanhToanDich.length===0) {
        return res.status(400).json({
            err: 'DestinationAccountNumber not found'
        })
    }

    let SoDuHienTai = TaiKhoanThanhToanDich[0].SoDu;
    let resultUpdate = await Partner_AccountBankModel.updateSoDu(payload.DestinationAccountNumber,SoDuHienTai+payload.Amount);

    if (resultUpdate.affectedRows===0) return res.status(503).json({
        err: 'Service Unavailable'
    });

    let rowLichSuGiaoDich = {
        "MaGiaoDich": payload.DestinationAccountNumber+'_'+payload.iat,
        "SoTaiKhoanGiaoDich": payload.DestinationAccountNumber,
        "NgayGiaoDich": moment().format("YYYY-MM-DD HH:mm:ss.SSS"), //thời điểm hiện tại
        "SoTien": payload.Amount,
        "NoiDung": payload.Message,
        "SoTaiKhoanNguoiGui": payload.SourceAccountNumber,
        "ThongTinNguoiGui": payload.SourceAccountName,
        "LienNganHang": 1,
        "TenNganHang": payload.BankName,
        "LoaiGiaoDich": "nhận tiền"
    }

    let resultAdd = await Partner_AccountBankModel.addLichSuGiaoDich(rowLichSuGiaoDich);
    if (resultAdd.affectedRows===0) throw new Error("Khong them duoc lich su giao dich, MaGiaoDich = "+rowLichSuGiaoDich.MaGiaoDich);

    res.json({"reply":"Giao dịch nộp tiền thành công"});
});


module.exports=router;