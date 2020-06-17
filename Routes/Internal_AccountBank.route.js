const express = require('express');

const Internal_AccountBankModel = require('../Models/Internal_AccountBank.model');

const router = express.Router();

//Liệt kê (get all) tất cả thông tin người nhận
router.get('/my-account-number/receiver-info', async (req, res) => {
    let payload = req.body;
    // payload = {
    //     "MyAccountNumber":147147147
    // }

    if (isNaN(payload.MyAccountNumber) || (payload.MyAccountNumber == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường MyAccountNumber, sai định dạng hoặc đang bỏ trống'
        });
    }

    payload.MyAccountNumber = +payload.MyAccountNumber;

    let resultList = await Internal_AccountBankModel.getThongTinNguoiNhan(payload.MyAccountNumber);
    if (resultList.length===0) {
        return res.status(400).json({
            err: 'MyAccountNumber not found'
        })
    }

    res.json(resultList);
});

//Thêm mới (add new) 1 thông tin người nhận
router.post('/my-account-number/receiver-info', async (req, res) => {
    let payload = req.body;
    // payload = {
    //     "MyAccountNumber":147147147,
    //     "TenGoiNho":"Anh Huy Giao Do",
    //     "SoTaiKhoanNguoiNhan":987987987,
    //     "TenNganHang":"VIETCOMBANK"
    // }

    if (isNaN(payload.MyAccountNumber) || (payload.MyAccountNumber == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường MyAccountNumber, sai định dạng hoặc đang bỏ trống'
        });
    }
    if (payload.TenGoiNho == null) {
        let resultTenDangKy = await Internal_AccountBankModel.getTenDangKy(payload.SoTaiKhoanNguoiNhan);
        if (resultTenDangKy.length===0) {
            return res.status(400).json({
                err: 'SoTaiKhoanNguoiNhan not found'
            })
        }
        payload.TenGoiNho = resultTenDangKy[0].TenKhachHang;
    }
    if (isNaN(payload.SoTaiKhoanNguoiNhan) || (payload.SoTaiKhoanNguoiNhan == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường SoTaiKhoanNguoiNhan, sai định dạng hoặc đang bỏ trống'
        });
    }
    if (payload.TenNganHang == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường TenNganHang, sai định dạng hoặc đang bỏ trống'
        });
    }

    payload.MyAccountNumber = +payload.MyAccountNumber;
    payload.SoTaiKhoanNguoiNhan = +payload.SoTaiKhoanNguoiNhan;

    let rowDanhSachNguoiNhan = {
        "TenGoiNho":payload.TenGoiNho,
        "SoTaiKhoanNguoiNhan":payload.SoTaiKhoanNguoiNhan,
        "TenNganHang":payload.TenNganHang,
        "SoTaiKhoan":payload.MyAccountNumber
    };

    let resultAdd = await Internal_AccountBankModel.addThongTinNguoiNhan(rowDanhSachNguoiNhan);
    if (resultAdd.affectedRows===0) throw new Error("Khong them moi duoc danh sach nguoi nhan, SoTaiKhoanNguoiNhan = "+rowDanhSachNguoiNhan.SoTaiKhoanNguoiNhan);

    res.status(201).json({});
});

//Chỉnh sửa (modify) 1 thông tin người nhận
router.patch('/my-account-number/receiver-info', async (req, res) => {
    let payload = req.body;
    // payload = {
    //     "MyAccountNumber":147147147, (can't modify)
    //     "TenGoiNho":"Anh Huy Giao Do", (allow modify)
    //     "SoTaiKhoanNguoiNhan":987987987, (allow modify)
    //     "TenNganHang":"VIETCOMBANK" (can't modify)
    // }

    if (isNaN(payload.MyAccountNumber) || (payload.MyAccountNumber == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường MyAccountNumber, sai định dạng hoặc đang bỏ trống'
        });
    }
    if (payload.TenGoiNho == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường TenGoiNho, sai định dạng hoặc đang bỏ trống'
        });
    }
    if (isNaN(payload.SoTaiKhoanNguoiNhan) || (payload.SoTaiKhoanNguoiNhan == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường SoTaiKhoanNguoiNhan, sai định dạng hoặc đang bỏ trống'
        });
    }
    if (payload.TenNganHang == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường TenNganHang, sai định dạng hoặc đang bỏ trống'
        });
    }

    payload.MyAccountNumber = +payload.MyAccountNumber;
    payload.SoTaiKhoanNguoiNhan = +payload.SoTaiKhoanNguoiNhan;

    let rowDanhSachNguoiNhan = {
        "TenGoiNho":payload.TenGoiNho,
        "SoTaiKhoanNguoiNhan":payload.SoTaiKhoanNguoiNhan,
        "TenNganHang":payload.TenNganHang,
        "SoTaiKhoan":payload.MyAccountNumber
    };

    let resultUpdate = await Internal_AccountBankModel.updateThongTinNguoiNhan(rowDanhSachNguoiNhan);
    if (resultUpdate.affectedRows===0) return res.status(503).json({
        err: 'Không thể update, vui lòng kiểm tra đầu vào'
    });

    res.json({"reply":"Chỉnh sửa thông tin người nhận thành công"});
});

//Xóa (delete) 1 thông tin người nhận
router.delete('/my-account-number/receiver-info', async (req, res) => {
    let payload = req.body;
    // payload = {
    //     "SoTaiKhoanNguoiNhan":842842841
    // }

    if (isNaN(payload.SoTaiKhoanNguoiNhan) || (payload.SoTaiKhoanNguoiNhan == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường SoTaiKhoanNguoiNhan, sai định dạng hoặc đang bỏ trống'
        });
    }

    payload.SoTaiKhoanNguoiNhan = +payload.SoTaiKhoanNguoiNhan;

    let resultList = await Internal_AccountBankModel.deleteThongTinNguoiNhan(payload.SoTaiKhoanNguoiNhan);

    if (resultList.affectedRows===0) 
        return res.status(400).json({
            err: 'SoTaiKhoanNguoiNhan not found'
        })

    res.json({"reply":"Xóa thông tin người nhận thành công"});
});

module.exports=router;