const express = require('express');
const moment=require('moment');

const transaction = require('../../Models/Admin/Transaction.model');
const bankConnection = require('../../Models/Internal_AccountBank.model');

const router = express.Router();

// Get toàn bộ giao dịch + Tổng tiền giao dịch theo một ngân hàng 
router.post('/bank-name', async(req, res) => {

    let payload = req.body;
    // payload = {
    //     "TenNganHang": "AGRIBANK",
    //      "DateStart": "1980/1/1",
    //      "DateEnd": "2030/1/1",
    //      "Quarter": 1
    // }

    

    // Có cả ngày bắt đầu và ngày kết thúc
    if( payload.DateStart && payload.DateEnd)
    {
        const Start = Date.parse(payload.DateStart);
        console.log(Start);
        const End = Date.parse(payload.DateEnd);

        if (isNaN(Start) || (Start == null)) {
            return res.status(400).json({
                err: 'Vui lòng kiểm tra lại trường ngày bắt đầu, sai định dạng hoặc đang bỏ trống'
            });
        }
        if (isNaN(End) || (End == null)) {
            return res.status(400).json({
                err: 'Vui lòng kiểm tra lại trường ngày kết thúc, sai định dạng hoặc đang bỏ trống'
            });
        }
        if(Start >= End){
            return res.status(400).json({
                err: 'Vui lòng kiểm tra lại trường ngày bắt đầu và ngày kết thúc'
            });
        }
    }
    
    //Ki
    if (payload.TenNganHang == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trườngTenNganHang, sai định dạng hoặc đang bỏ trống'
        });
    }

    const resultList = await bankConnection.getNganHangLienKet(payload.TenNganHang);
    if(resultList.length === 0){
        return res.status(400).json({
            err: 'Ngân hàng chưa được liên kết'
        });
    };

    const row ={
        "TenNganHang": payload.TenNganHang,
        "NgayBatDau": payload.DateStart,
        "NgayKetThuc": payload.DateEnd
    }

    const resultTotalMoneyTransactions = await transaction.getTotalTransactionByBankName(payload.TenNganHang);
    const resultTransactions = await transaction.getTransactionByBankName(row);
    res.status(200).json({
        Total: resultTotalMoneyTransactions[0],
        Transactions: resultTransactions
    });

});

// Tổng tiền theo từng ngân hàng liên kết
router.get('/bank-name', async(req, res) => {

    // let payload = req.body;    


    // const resultList = await bankConnection.getNganHangLienKet(payload.TenNganHang);
    // if(resultList.length === 0){
    //     return res.status(400).json({
    //         err: 'Ngân hàng chưa được liên kết'
    //     });
    // };

    // const row ={
    //     "TenNganHang": payload.TenNganHang,
    //     "NgayBatDau": payload.DateStart,
    //     "NgayKetThuc": payload.DateEnd
    // }

    //const resultTotalMoneyTransactions = await transaction.getTotalTransactionByBankName();
    
    //Tổng giao dịch theo từng ngân hàng
    const resultTransactions = await transaction.getTotalRevenueByBankName();
    res.status(200).json({
        ...resultTransactions
    });

});

router.get('/year', async(req, res) => {
    
    //Tổng giao dịch theo từng ngân hàng
    const resultTransactions = await transaction.getTotalTransactionByYear();
    res.status(200).json({
        ...resultTransactions
    });

});

router.get('/month', async(req, res) => {
    
    //Tổng giao dịch theo từng ngân hàng
    const resultTransactions = await transaction.getTotalTransactionByMonth();
    res.status(200).json({
        ...resultTransactions
    });

});
module.exports =router;