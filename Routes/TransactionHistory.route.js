const express = require('express');
const transactionModel=require('../Models/TransactionHistory.model');

const router = express.Router();

//lay toan bo lich su giao dich theo stk giao dich
router.get('/HitoryTransaction/:stkgd',async(req,res)=>{
    //kiem tra tinh hop le
    if(isNaN(req.params.stkgd)){
        return res.status(400).json({
            err:'invalid stkgd'
        });
    }
    const stkgd=+req.params.stkgd || 0;
    let list=await transactionModel.getGiaoDich(stkgd);
    const ret={
        ...list
    }
    res.json(ret);
});
//lay lich su giao dich nhan tien tien theo stk giao dich
router.get('/ReceiveTransaction/:stkgd',async(req,res)=>{
    //kiem tra tinh hop le
    if(isNaN(req.params.stkgd)){
        return res.status(400).json({
            err:'invalid stkgd'
        });
    }
    const stkgd=+req.params.stkgd || 0;
    let list=await transactionModel.getGiaoDichNhanTien(stkgd);
    const ret={
        ...list
    }
    res.json(ret);
});
//lay lich su giao dich chuyen khoan theo stk giao dich
router.get('/TranferTransaction/:stkgd',async(req,res)=>{
    //kiem tra tinh hop le
    if(isNaN(req.params.stkgd)){
        return res.status(400).json({
            err:'invalid stkgd'
        });
    }
    const stkgd=+req.params.stkgd || 0;
    let list=await transactionModel.getGiaoDichChuyenKhoan(stkgd);
    const ret={
        ...list
    }
    res.json(ret);
});
//lay lich su giao dich thanh toan nhac no theo stk giao dich
router.get('/LoanTransaction/:stkgd',async(req,res)=>{
    //kiem tra tinh hop le
    if(isNaN(req.params.stkgd)){
        return res.status(400).json({
            err:'invalid stkgd'
        });
    }
    const stkgd=+req.params.stkgd || 0;
    let list=await transactionModel.getGiaoDichThanhToanNhacNo(stkgd);
    const ret={
        ...list
    }
    res.json(ret);
});
module.exports=router;