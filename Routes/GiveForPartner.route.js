const express = require('express');

const GiveForPartnerModel = require('../Models/GiveForPartner.model');

const router = express.Router();

router.get('/payment-account', async (req, res) => {
    let result = await GiveForPartnerModel.getTaiKhoanThanhToan();
    res.json(result);
});

router.get('/transaction-history', async (req, res) => {
    let result = await GiveForPartnerModel.getLichSuGiaoDich();
    res.json(result);
});

module.exports=router;