const fs = require('fs');
const express = require('express');
const request = require('request');
const moment = require('moment');
const md5 = require('md5');
const NodeRSA = require('node-rsa');

const config = require('../Config/config.json');
const External_AccountBankModel = require('../Models/External_AccountBank.model');

const MyBank_PrivateKey = fs.readFileSync('Keys/RSA/MyPrivateKey.pem','utf8');
const MyBank_PrivateKeyObject = new NodeRSA(MyBank_PrivateKey);

const router = express.Router();

//Truy vấn thông tin tài khoản của ngân hàng khác
router.get('/destination-account', async (req, res) => {
    let payload = req.body;

    // payload = {
    //     "DestinationBankName":".....",
    //     "DestinationAccountNumber":102102102
    // }

    let DestinationAccountNumber = payload.DestinationAccountNumber;
    let DestinationBankName = payload.DestinationBankName;

    if (DestinationBankName == null){
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường DestinationBankName, sai định dạng hoặc đang bỏ trống'
        });     
    }
    if (isNaN(DestinationAccountNumber) || (DestinationAccountNumber == null)){
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường DestinationAccountNumber, sai định dạng hoặc đang bỏ trống'
        });     
    }

    let data = await External_AccountBankModel.checkBankPartner(DestinationBankName);
    if (data.length === 0) return res.status(406).json({"reply":"Xin lỗi, không tìm thấy ngân hàng liên kết trong cơ sở dữ liệu"});

    DestinationAccountNumber = +DestinationAccountNumber;

    switch (DestinationBankName) {
        case "GO":
        {
            const ts = moment().valueOf();
            const hashSecretKey = md5("Infymt");
            const reqBody = {"account_number":DestinationAccountNumber.toString()};
            request({
                method: 'GET',
                url: 'https://infymt.herokuapp.com/api/accounts/partner',
                headers: {
                    "partnerCode":"25Bank",
                    "ts": ts,
                    "sig": md5(ts + JSON.stringify(reqBody) + hashSecretKey)
                },
                json: reqBody
            }, function (error, response, body) {
                if (error) return res.status(500).json({"err":"Vui lòng thử lại request"});

                try {
                    body = JSON.parse(body);
                } catch(err){
                    //ignore
                }

                if ((response.statusCode === 500)&&(body.message==="Error.")) return res.status(204).json({});

                res.json(body);
            });
            break;
        }
    }
});

//Nạp tiền vào tài khoản ngân hàng khác
router.post('/destination-account/recharge', async (req, res) => {
    let payload = req.body;

    // payload = {
    //     "DestinationBankName":"AGRIBANK",
    //     "SourceAccountNumber":258258258,
    //     "SourceAccountName":"Đặng Văn Lâm",
    //     "DestinationAccountNumber":102102102,
    //     "DestinationAccountName":"Nguyễn Thanh Nam",
    //     "Amount":1250000, //1 triệu 2 trăm 50 nghìn
    //     "Message":"thanh toán tiền phòng",
    // }

    if (payload.DestinationBankName == null){
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường DestinationBankName, sai định dạng hoặc đang bỏ trống'
        });     
    }

    if (isNaN(payload.SourceAccountNumber) || (payload.SourceAccountNumber == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường SourceAccountNumber, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.SourceAccountName == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường SourceAccountName, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (isNaN(payload.DestinationAccountNumber) || (payload.DestinationAccountNumber == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường DestinationAccountNumber, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.DestinationAccountName == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường DestinationAccountName, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (isNaN(payload.Amount) || (payload.Amount == null) || (+payload.Amount <=0)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Amount, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.Message == null){
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Message, sai định dạng hoặc đang bỏ trống'
        });     
    }

    let data = await External_AccountBankModel.checkBankPartner(payload.DestinationBankName);
    if (data.length === 0) return res.status(406).json({"reply":"Xin lỗi, không tìm thấy ngân hàng liên kết trong cơ sở dữ liệu"});

    //parse from string to number
    payload.DestinationAccountNumber = +payload.DestinationAccountNumber;
    payload.SourceAccountNumber = +payload.SourceAccountNumber;
    payload.Amount = +payload.Amount;

    let TaiKhoanThanhToanNguon = await External_AccountBankModel.getTaiKhoanThanhToan(payload.SourceAccountNumber);
    if (TaiKhoanThanhToanNguon.length===0) {
        return res.status(400).json({
            err: 'SourceAccountNumber not found'
        })
    }

    let SoDuHienTai = TaiKhoanThanhToanNguon[0].SoDu;
    if ((SoDuHienTai-config.BANK.MinimumBalance) < payload.Amount) { //MinimumBalance xác định trong tài khoản phải có ít nhất 50 nghìn đồng và không được giao dịch với số tiền này
        return res.status(406).json({
            err: 'Xin lỗi, số dư không đủ để thực hiện giao dịch này, sau giao dịch phải có ít nhất 50.000 đồng',
            CurrentBalance: SoDuHienTai
        })
    }

    switch (payload.DestinationBankName) {
        case "GO":
        {
            const ts = moment().valueOf();
            const hashSecretKey = md5("Infymt");
            const reqBody = {"account_number":payload.DestinationAccountNumber.toString(),"money":payload.Amount,"currentTime":ts};
            const signature = MyBank_PrivateKeyObject.sign(reqBody,"base64");
            request({
                method: 'POST',
                url: 'https://infymt.herokuapp.com/api/accounts/partner/recharge',
                headers: {
                    "partnerCode":"25Bank",
                    "ts": ts,
                    "sig": md5(ts + JSON.stringify(reqBody) + hashSecretKey),
                    "signature": signature
                },
                json: reqBody
            }, async function(error, response, body) {
                if (error) return res.status(500).json({"err":"Vui lòng thử lại request"});

                try {
                    body = JSON.parse(body);
                } catch(err){
                    //ignore
                }

                if ((response.statusCode === 200)&&(body==="Number not found")) return res.status(400).json({err: 'DestinationAccountNumber not found'});

                res.json(body);

                let resultUpdate = await External_AccountBankModel.updateSoDu(payload.SourceAccountNumber,SoDuHienTai-payload.Amount);
                if (resultUpdate.affectedRows===0) return res.status(503).json({
                    err: 'Service Unavailable'
                });

                let rowLichSuGiaoDich = {
                    "MaGiaoDich": payload.SourceAccountNumber+'_'+ts,
                    "SoTaiKhoanGiaoDich": payload.SourceAccountNumber,
                    "NgayGiaoDich": moment().format("YYYY-MM-DD HH:mm:ss.SSS"), //thời điểm hiện tại
                    "SoTien": payload.Amount,
                    "NoiDung": payload.Message,
                    "SoTaiKhoanNguoiGui": payload.DestinationAccountNumber,
                    "ThongTinNguoiGui": payload.DestinationAccountName,
                    "LienNganHang": 1,
                    "TenNganHang": payload.DestinationBankName,
                    "LoaiGiaoDich": "chuyển khoản"
                }

                let resultAdd = await External_AccountBankModel.addLichSuGiaoDich(rowLichSuGiaoDich);
                if (resultAdd.affectedRows===0) throw new Error("Khong them duoc lich su giao dich, MaGiaoDich = "+rowLichSuGiaoDich.MaGiaoDich);
            });
            break;
        }
    }
});


module.exports=router;