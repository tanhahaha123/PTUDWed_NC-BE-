const express = require('express');

const Internal_AccountCustomerModel = require('../Models/Internal_AccountCustomer.model');

const router = express.Router();

// Liệt kê danh sách tài khoản ngân hàng của tài khoản khách hàng "my-account-customer"
router.post('/my-account-customer/account-bank', (req, res) => {

});

router.get('/my-account-customer/info', async (req, res) => {
	let payload = req.body;
    // payload = {
    //     "userId":3
    // }

    if (isNaN(payload.userId) || (payload.userId == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường userId, sai định dạng hoặc đang bỏ trống'
        });
    }

    let ThongTinKhachHang = await Internal_AccountCustomerModel.getThongTinKhachHang(payload.userId);
    if (ThongTinKhachHang.length === 0) return res.status(400).json({
        err: 'userId not found'
    });

    res.json(ThongTinKhachHang[0]);
});

module.exports=router;