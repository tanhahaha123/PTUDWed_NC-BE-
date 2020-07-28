const express = require('express');

const Internal_AccountCustomerModel = require('../Models/Internal_AccountCustomer.model');

const router = express.Router();

// Liệt kê danh sách tài khoản ngân hàng của tài khoản khách hàng "my-account-customer"
router.post('/my-account-customer/account-bank', (req, res) => {

});

router.get('/my-account-customer/info', async (req, res) => {
	let payload = {};
    payload.userId = req.query.userId;
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

router.get('/my-account-customer/account-bank', async (req, res) => {
    let payload = {};
    payload.userId = req.query.userId;
    // payload = {
    //     "userId":3
    // }

    if (isNaN(payload.userId) || (payload.userId == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường userId, sai định dạng hoặc đang bỏ trống'
        });
    }

    let DanhSachTaiKhoanNganHang = await Internal_AccountCustomerModel.getTaiKhoanNganHang(payload.userId);
    if (DanhSachTaiKhoanNganHang.length === 0) return res.status(400).json({
        err: 'userId not found'
    });

    res.json(DanhSachTaiKhoanNganHang);
});

router.get('/my-account-customer/payment-account', async (req, res) => {
    let payload = {};
    payload.userId = req.query.userId;
    // payload = {
    //     "userId":3
    // }

    if (isNaN(payload.userId) || (payload.userId == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường userId, sai định dạng hoặc đang bỏ trống'
        });
    }

    let DanhSachTaiKhoanThanhToan = await Internal_AccountCustomerModel.getTaiKhoanThanhToan(payload.userId);
    if (DanhSachTaiKhoanThanhToan.length === 0) return res.status(400).json({
        err: 'userId not found'
    });

    res.json(DanhSachTaiKhoanThanhToan);
});

router.get('/my-account-customer/saving-account', async (req, res) => {
    let payload = {};
    payload.userId = req.query.userId;
    // payload = {
    //     "userId":3
    // }

    if (isNaN(payload.userId) || (payload.userId == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường userId, sai định dạng hoặc đang bỏ trống'
        });
    }

    let DanhSachTaiKhoanTietKiem = await Internal_AccountCustomerModel.getTaiKhoanTietKiem(payload.userId);
    if (DanhSachTaiKhoanTietKiem.length === 0) return res.status(400).json({
        err: 'userId not found'
    });

    res.json(DanhSachTaiKhoanTietKiem);
});

router.get('/my-account-customer/user-name', async (req, res) => {
    let payload = {};
    payload.userId = req.query.userId;
    // payload = {
    //     "userId":3
    // }

    if (isNaN(payload.userId) || (payload.userId == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường userId, sai định dạng hoặc đang bỏ trống'
        });
    }

    let resultUsername = await Internal_AccountCustomerModel.getUsername(payload.userId);
    if (resultUsername.length === 0) return res.status(400).json({
        err: 'userId not found'
    });

    res.json(resultUsername[0]);
});

router.get('/my-account-customer/get-bank-partner', async (req, res) => {
    let payload = {};
    payload.userId = req.query.userId;
    // payload = {
    //     "userId":3
    // }

    if (isNaN(payload.userId) || (payload.userId == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường userId, sai định dạng hoặc đang bỏ trống'
        });
    }

    let result = await Internal_AccountCustomerModel.getBankPartner(payload.userId);
    if (result.length === 0) return res.status(400).json({
        err: 'userId not found'
    });

    res.json(result);
});

module.exports=router;