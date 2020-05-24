const express = require('express');
const request = require('request');
const moment = require('moment');

const config = require('../Config/config.json');
const External_AccountBankModel = require('../Models/External_AccountBank.model');


const router = express.Router();

//Truy vấn thông tin tài khoản của ngân hàng khác
router.get('/destination-account', async (req, res) => {
    let payload = req.MyPayload;

    // payload = {
    //     "DestinationBankName":".....",
    //     "DestinationAccountNumber":102102102
    // }

    let DestinationAccountNumber = payload.DestinationAccountNumber;
    let DestinationBankName = payload.DestinationBankName;

    if (DestinationBankName == null){
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường DestinationBankName'
        });     
    }
    if (isNaN(DestinationAccountNumber) || (DestinationAccountNumber == null)){
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường DestinationAccountNumber'
        });     
    }

    let data = await Partner_AccountBankModel.checkBankPartner(DestinationBankName);
    if (data.length === 0) return res.status(406).json({"reply":"Xin lỗi, không tìm thấy ngân hàng liên kết trong cơ sở dữ liệu"});

    DestinationAccountNumber = +DestinationAccountNumber;

    switch (DestinationBankName) {
        case "AGRIBANK":
        {
            request('http://www.google.com', function (error, response, body) {
              console.error('error:', error); // Print the error if one occurred
              console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
              console.log('body:', body); // Print the HTML for the Google homepage.
              res.json(body);
            });
            break;
        }
        case "VIETCOMBANK":
        {
            request('http://www.google.com', function (error, response, body) {
              console.error('error:', error); // Print the error if one occurred
              console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
              console.log('body:', body); // Print the HTML for the Google homepage.
              res.json(body);
            });
            break;
        }
    }
});

//Nạp tiền vào tài khoản ngân hàng khác
router.post('/destination-account/recharge', async (req, res) => {
    let payload = req.MyPayload;

    // payload = {
    //     "DestinationBankName":"AGRIBANK",
    //     "SourceAccountNumber":258258258,
    //     "DestinationAccountNumber":102102102,
    //     "Amount":1250000, //1 triệu 2 trăm 50 nghìn
    //     "Message":"thanh toán tiền phòng",
    // }

    if (payload.DestinationBankName == null){
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường DestinationBankName, không được bỏ trống'
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

    let data = await External_AccountBankModel.checkBankPartner(DestinationBankName);
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
            err: 'Xin lỗi, số dư không đủ để thực hiện giao dịch này'
        })
    }

    switch (DestinationBankName) {
        case "AGRIBANK":
        {
            request('http://www.google.com', function (error, response, body) {
              console.error('error:', error); // Print the error if one occurred
              console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
              console.log('body:', body); // Print the HTML for the Google homepage.
              res.json(body);
            });
            break;
        }
        case "VIETCOMBANK":
        {
            request('http://www.google.com', function (error, response, body) {
              console.error('error:', error); // Print the error if one occurred
              console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
              console.log('body:', body); // Print the HTML for the Google homepage.
              res.json(body);
            });
            break;
        }
    }
});


module.exports=router;