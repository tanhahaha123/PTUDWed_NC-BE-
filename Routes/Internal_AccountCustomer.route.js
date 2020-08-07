const express = require('express');

const Internal_AccountCustomerModel = require('../Models/Internal_AccountCustomer.model');

const router = express.Router();

// Liệt kê danh sách tài khoản ngân hàng của tài khoản khách hàng "my-account-customer"
router.post('/my-account-customer/account-bank', (req, res) => {

});

router.get('/my-account-customer/info', async (req, res) => {
	let payload = {};
    payload.idTaiKhoanKhachHang = req.query.idTaiKhoanKhachHang;
    // payload = {
    //     "idTaiKhoanKhachHang":3
    // }

    if (isNaN(payload.idTaiKhoanKhachHang) || (payload.idTaiKhoanKhachHang == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường idTaiKhoanKhachHang, sai định dạng hoặc đang bỏ trống'
        });
    }

    let ThongTinKhachHang = await Internal_AccountCustomerModel.getThongTinKhachHang(payload.idTaiKhoanKhachHang);
    if (ThongTinKhachHang.length === 0) return res.status(400).json({
        err: 'idTaiKhoanKhachHang not found'
    });

    res.json(ThongTinKhachHang[0]);
});

router.get('/my-account-customer/account-bank', async (req, res) => {
    let payload = {};
    payload.idTaiKhoanKhachHang = req.query.idTaiKhoanKhachHang;
    // payload = {
    //     "idTaiKhoanKhachHang":3
    // }

    if (isNaN(payload.idTaiKhoanKhachHang) || (payload.idTaiKhoanKhachHang == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường idTaiKhoanKhachHang, sai định dạng hoặc đang bỏ trống'
        });
    }

    let DanhSachTaiKhoanNganHang = await Internal_AccountCustomerModel.getTaiKhoanNganHang(payload.idTaiKhoanKhachHang);
    if (DanhSachTaiKhoanNganHang.length === 0) return res.status(400).json({
        err: 'idTaiKhoanKhachHang not found'
    });

    res.json(DanhSachTaiKhoanNganHang);
});

router.get('/my-account-customer/payment-account', async (req, res) => {
    let payload = {};
    payload.idTaiKhoanKhachHang = req.query.idTaiKhoanKhachHang;
    // payload = {
    //     "idTaiKhoanKhachHang":3
    // }

    if (isNaN(payload.idTaiKhoanKhachHang) || (payload.idTaiKhoanKhachHang == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường idTaiKhoanKhachHang, sai định dạng hoặc đang bỏ trống'
        });
    }

    let DanhSachTaiKhoanThanhToan = await Internal_AccountCustomerModel.getTaiKhoanThanhToan(payload.idTaiKhoanKhachHang);
    if (DanhSachTaiKhoanThanhToan.length === 0) return res.status(400).json({
        err: 'idTaiKhoanKhachHang not found'
    });

    res.json(DanhSachTaiKhoanThanhToan);
});

router.get('/my-account-customer/saving-account', async (req, res) => {
    let payload = {};
    payload.idTaiKhoanKhachHang = req.query.idTaiKhoanKhachHang;
    // payload = {
    //     "idTaiKhoanKhachHang":3
    // }

    if (isNaN(payload.idTaiKhoanKhachHang) || (payload.idTaiKhoanKhachHang == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường idTaiKhoanKhachHang, sai định dạng hoặc đang bỏ trống'
        });
    }

    let DanhSachTaiKhoanTietKiem = await Internal_AccountCustomerModel.getTaiKhoanTietKiem(payload.idTaiKhoanKhachHang);
    if (DanhSachTaiKhoanTietKiem.length === 0) return res.status(400).json({
        err: 'idTaiKhoanKhachHang not found'
    });

    res.json(DanhSachTaiKhoanTietKiem);
});

router.get('/my-account-customer/user-name', async (req, res) => {
    let payload = {};
    payload.idTaiKhoanKhachHang = req.query.idTaiKhoanKhachHang;
    // payload = {
    //     "idTaiKhoanKhachHang":3
    // }

    if (isNaN(payload.idTaiKhoanKhachHang) || (payload.idTaiKhoanKhachHang == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường idTaiKhoanKhachHang, sai định dạng hoặc đang bỏ trống'
        });
    }

    let resultUsername = await Internal_AccountCustomerModel.getUsername(payload.idTaiKhoanKhachHang);
    if (resultUsername.length === 0) return res.status(400).json({
        err: 'idTaiKhoanKhachHang not found'
    });

    res.json(resultUsername[0]);
});

router.get('/my-account-customer/get-bank-partner', async (req, res) => {
    let payload = {};
    payload.idTaiKhoanKhachHang = req.query.idTaiKhoanKhachHang;
    // payload = {
    //     "idTaiKhoanKhachHang":3
    // }

    if (isNaN(payload.idTaiKhoanKhachHang) || (payload.idTaiKhoanKhachHang == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường idTaiKhoanKhachHang, sai định dạng hoặc đang bỏ trống'
        });
    }

    let result = await Internal_AccountCustomerModel.getBankPartner(payload.idTaiKhoanKhachHang);
    if (result.length === 0) return res.status(400).json({
        err: 'idTaiKhoanKhachHang not found'
    });

    res.json(result);
});

router.get('/my-account-customer/payment-account-detail', async (req, res) => {
    let payload = {};
    payload.idTaiKhoanKhachHang = req.query.idTaiKhoanKhachHang;
    // payload = {
    //     "idTaiKhoanKhachHang":3
    // }

    if (isNaN(payload.idTaiKhoanKhachHang) || (payload.idTaiKhoanKhachHang == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường idTaiKhoanKhachHang, sai định dạng hoặc đang bỏ trống'
        });
    }

    let DanhSachTaiKhoanThanhToanChiTiet = await Internal_AccountCustomerModel.getTaiKhoanThanhToanChiTiet(payload.idTaiKhoanKhachHang);
    if (DanhSachTaiKhoanThanhToanChiTiet.length === 0) return res.status(400).json({
        err: 'idTaiKhoanKhachHang not found'
    });

    res.json(DanhSachTaiKhoanThanhToanChiTiet);
});

router.get('/my-account-customer/saving-account-detail', async (req, res) => {
    let payload = {};
    payload.idTaiKhoanKhachHang = req.query.idTaiKhoanKhachHang;
    // payload = {
    //     "idTaiKhoanKhachHang":3
    // }

    if (isNaN(payload.idTaiKhoanKhachHang) || (payload.idTaiKhoanKhachHang == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường idTaiKhoanKhachHang, sai định dạng hoặc đang bỏ trống'
        });
    }

    let DanhSachTaiKhoanTietKiemChiTiet = await Internal_AccountCustomerModel.getTaiKhoanTietKiemChiTiet(payload.idTaiKhoanKhachHang);
    if (DanhSachTaiKhoanTietKiemChiTiet.length === 0) return res.status(400).json({
        err: 'idTaiKhoanKhachHang not found'
    });

    res.json(DanhSachTaiKhoanTietKiemChiTiet);
});


module.exports=router;