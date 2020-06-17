const express = require('express');
const request = require('request');
const moment = require('moment');
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const fs = require("fs");

const config = require('../Config/config.json');
const Internal_AccountBankModel = require('../Models/Internal_AccountBank.model');
const InternalOTPVerify = require('../Middlewares/InternalOTPVerify.mdw');
const ExternalOTPVerify = require('../Middlewares/ExternalOTPVerify.mdw');
const ExternalFunction = require('../Utils/ExternalFunction');

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

//Chuyển khoản từ tài khoản "my-account-number" tới tài khoản khác trong cùng một ngân hàng (lấy mã OTP)
router.get('/my-account-number/internal-transfer', async (req, res) => {
    let payload = req.body;
    // payload = {
    //     "MyAccountNumber":147147147,
    //     "DestinationAccountNumber":123123123,
    //     "Amount":250000,
    //     "Message":"Trả tiền nợ tháng 4",
    //     "SenderPayFee":true
    // }



    if (isNaN(payload.MyAccountNumber) || (payload.MyAccountNumber == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường MyAccountNumber, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (isNaN(payload.DestinationAccountNumber) || (payload.DestinationAccountNumber == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường DestinationAccountNumber, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (isNaN(payload.Amount) || (payload.Amount == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Amount, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.Message == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Message, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.SenderPayFee == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường SenderPayFee, sai định dạng hoặc đang bỏ trống'
        });
    }

    payload.MyAccountNumber = +payload.MyAccountNumber;
    payload.DestinationAccountNumber = +payload.DestinationAccountNumber;
    payload.Amount = +payload.Amount;

    let TaiKhoanThanhToanNguon = await Internal_AccountBankModel.getTaiKhoanThanhToan(payload.MyAccountNumber);
    if (TaiKhoanThanhToanNguon.length === 0) return res.status(400).json({
        err: 'MyAccountNumber not found'
    });

    let TaiKhoanThanhToanDich = await Internal_AccountBankModel.getTaiKhoanThanhToan(payload.DestinationAccountNumber);
    if (TaiKhoanThanhToanDich.length === 0) return res.status(400).json({
        err: 'DestinationAccountNumber not found'
    });

    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "noreply.25bank@gmail.com",
            pass: "hailambank"
        }
    });

    let OTPCode = Math.floor((Math.random() * 900000))+100000; //100000->999999
    let resultDeleteOTP = await Internal_AccountBankModel.deleteOTPCode(payload.MyAccountNumber);

    let rowOTPCode = {
        "SoTaiKhoan": payload.MyAccountNumber,
        "OTPCode": OTPCode,
        "ExpireAt": moment().valueOf()+config.BANK.OTPExpiredTime*1000
    };

    let resultAddOTP = await Internal_AccountBankModel.addOTPCode(rowOTPCode);
    if (resultAddOTP.affectedRows===0) throw new Error("Khong them duoc ma OTP " +OTPCode+" (So Tai Khoan: "+payload.MyAccountNumber+") vao co so du lieu");

    let resultGetKhachHang = await Internal_AccountBankModel.getKhachHang(payload.MyAccountNumber);
    if (resultGetKhachHang.length === 0) return res.status(400).json({
        err: 'MyAccountNumber not found'
    });

    let resultGetKhachHang2 = await Internal_AccountBankModel.getKhachHang(payload.DestinationAccountNumber);
    if (resultGetKhachHang2.length === 0) return res.status(400).json({
        err: 'DestinationAccountNumber not found'
    });

    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'noreply.25bank@gmail.com',
        to: resultGetKhachHang[0].Email,
        subject: OTPCode +' is your OTP 25BANK code',
        html: ejs.render(fs.readFileSync('./Config/OTPmail-template.ejs', 'utf-8'), {TenKhachHang: resultGetKhachHang[0].TenKhachHang, SoTaiKhoanNguoiNhan: payload.DestinationAccountNumber, TenChuSoHuu: resultGetKhachHang2[0].TenKhachHang, TenNganHang: "25Bank", SoTien: formatCurrency(payload.Amount.toString()), OTPCode: OTPCode})
    }

    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            throw new Error("Khong gui duoc ma OTP qua email");
        } else {
            res.json({
                "reply": "hệ thống đã gửi mã OTP đến email của bạn, vui lòng kiểm tra trong mail"
            });
        }
    });

});

//Chuyển khoản từ tài khoản "my-account-number" tới tài khoản khác trong cùng một ngân hàng (đã verify OTP)
router.post('/my-account-number/internal-transfer', InternalOTPVerify, async (req, res) => {
    let payload = req.body;
    // payload = {
    //     "MyAccountNumber":147147147,
    //     "DestinationAccountNumber":123123123,
    //     "Amount":250000,
    //     "Message":"Trả tiền nợ tháng 4",
    //     "SenderPayFee":true,
    //     "OTPCode":"654789"
    // }

    if (payload.SenderPayFee == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường SenderPayFee, sai định dạng hoặc đang bỏ trống'
        });
    }

    let TaiKhoanThanhToanNguon = await Internal_AccountBankModel.getTaiKhoanThanhToan(payload.MyAccountNumber);
    if (TaiKhoanThanhToanNguon.length === 0) return res.status(400).json({
        err: 'MyAccountNumber not found'
    });

    let TaiKhoanThanhToanDich = await Internal_AccountBankModel.getTaiKhoanThanhToan(payload.DestinationAccountNumber);
    if (TaiKhoanThanhToanDich.length === 0) return res.status(400).json({
        err: 'DestinationAccountNumber not found'
    });

    let FeeNguon;
    let FeeDich;
    if (payload.SenderPayFee===true) {
        FeeNguon = config.BANK.InternalFee;
        FeeDich = 0;
    }
    else {
        FeeNguon = 0;
        FeeDich = config.BANK.InternalFee;
    }

    let SoDuHienTaiNguon = TaiKhoanThanhToanNguon[0].SoDu;
    let SoDuHienTaiDich = TaiKhoanThanhToanDich[0].SoDu;

    if ((SoDuHienTaiNguon-config.BANK.MinimumBalance) < (payload.Amount+FeeNguon)) { //MinimumBalance xác định trong tài khoản phải có ít nhất 50 nghìn đồng và không được giao dịch với số tiền này
        return res.status(406).json({
            err: 'Xin lỗi, số dư không đủ để thực hiện giao dịch này, sau giao dịch phải có ít nhất 50.000 đồng',
            CurrentBalance: SoDuHienTaiNguon
        })
    }

    let resultUpdateNguon = await Internal_AccountBankModel.updateSoDu(payload.MyAccountNumber,SoDuHienTaiNguon-payload.Amount-FeeNguon);
    let resultUpdateDich = await Internal_AccountBankModel.updateSoDu(payload.DestinationAccountNumber,SoDuHienTaiDich+payload.Amount-FeeDich);

    if ((resultUpdateNguon.affectedRows!==0)&&(resultUpdateDich.affectedRows!==0)) res.json({
        reply: "Giao dịch chuyển khoản thành công"
    });
    else res.status(503).json({
        err: "Giao dịch chuyển khoản thất bại"
    });

    let resultTenDangKy = await Internal_AccountBankModel.getTenDangKy(payload.DestinationAccountNumber);
    let ts = moment().valueOf();

    let rowLichSuGiaoDich = {
        "MaGiaoDich": payload.MyAccountNumber+'_'+ts,
        "SoTaiKhoanGiaoDich": payload.MyAccountNumber,
        "NgayGiaoDich": moment(ts).format("YYYY-MM-DD HH:mm:ss.SSS"), //thời điểm hiện tại
        "SoTien": payload.Amount-FeeDich,
        "NoiDung": payload.Message,
        "SoTaiKhoanNguoiGui": payload.DestinationAccountNumber,
        "ThongTinNguoiGui": resultTenDangKy[0].TenKhachHang,
        "LienNganHang": 0,
        "TenNganHang": "25Bank",
        "LoaiGiaoDich": "chuyển khoản"
    };

    let resultAdd = await Internal_AccountBankModel.addLichSuGiaoDich(rowLichSuGiaoDich);
    if (resultAdd.affectedRows===0) throw new Error("Khong them duoc lich su giao dich, MaGiaoDich = "+rowLichSuGiaoDich.MaGiaoDich);

});

//Chuyển khoản từ tài khoản "my-account-number" tới tài khoản khác liên ngân hàng (lấy mã OTP)
router.get('/my-account-number/external-transfer', async (req, res) => {
    let payload = req.body;
    // payload = {
    //     "MyAccountNumber":147147147,
    //     "DestinationAccountNumber":123123123,
    //     "Amount":250000,
    //     "Message":"Trả tiền nợ tháng 4",
    //     "SenderPayFee":true,
    //     "BankName":"GO"
    // }

    if (isNaN(payload.MyAccountNumber) || (payload.MyAccountNumber == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường MyAccountNumber, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (isNaN(payload.DestinationAccountNumber) || (payload.DestinationAccountNumber == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường DestinationAccountNumber, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (isNaN(payload.Amount) || (payload.Amount == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Amount, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.Message == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Message, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.SenderPayFee == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường SenderPayFee, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.BankName == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường BankName, sai định dạng hoặc đang bỏ trống'
        });
    }

    payload.MyAccountNumber = +payload.MyAccountNumber;
    payload.DestinationAccountNumber = +payload.DestinationAccountNumber;
    payload.Amount = +payload.Amount;

    let TaiKhoanThanhToanNguon = await Internal_AccountBankModel.getTaiKhoanThanhToan(payload.MyAccountNumber);
    if (TaiKhoanThanhToanNguon.length === 0) return res.status(400).json({
        err: 'MyAccountNumber not found'
    });

    let option = {
        "DestinationBankName":payload.BankName,
        "DestinationAccountNumber":payload.DestinationAccountNumber
    }
    let resultRequest = await ExternalFunction.getExternalInfoAccount(option);

    if (resultRequest.StatusCode===503) return res.status(503).json(resultRequest.json);//Dịch vụ ngân hàng liên kết không có sẵn
    if (resultRequest.StatusCode===408) return res.status(408).json(resultRequest.json);//Request quá hạn
    if (resultRequest.StatusCode===406) return res.status(406).json(resultRequest.json);//Ngân hàng chưa liên kết
    if (resultRequest.StatusCode===204) return res.status(204).json(resultRequest.json);//Tài khoản đích không tồn tại
    if (resultRequest.StatusCode===200) payload.DestinationAccountName = resultRequest.json.DestinationAccountName;

    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "noreply.25bank@gmail.com",
            pass: "hailambank"
        }
    });

    let OTPCode = Math.floor((Math.random() * 900000))+100000; //100000->999999
    let resultDeleteOTP = await Internal_AccountBankModel.deleteOTPCode(payload.MyAccountNumber);

    let rowOTPCode = {
        "SoTaiKhoan": payload.MyAccountNumber,
        "OTPCode": OTPCode,
        "ExpireAt": moment().valueOf()+config.BANK.OTPExpiredTime*1000
    };

    let resultAddOTP = await Internal_AccountBankModel.addOTPCode(rowOTPCode);
    if (resultAddOTP.affectedRows===0) throw new Error("Khong them duoc ma OTP " +OTPCode+" (So Tai Khoan: "+payload.MyAccountNumber+") vao co so du lieu");

    let resultGetKhachHang = await Internal_AccountBankModel.getKhachHang(payload.MyAccountNumber);
    if (resultGetKhachHang.length === 0) return res.status(400).json({
        err: 'MyAccountNumber not found'
    });

    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'noreply.25bank@gmail.com',
        to: resultGetKhachHang[0].Email,
        subject: OTPCode +' is your OTP 25BANK code',
        html: ejs.render(fs.readFileSync('./Config/OTPmail-template.ejs', 'utf-8'), {TenKhachHang: resultGetKhachHang[0].TenKhachHang, SoTaiKhoanNguoiNhan: payload.DestinationAccountNumber, TenChuSoHuu: payload.DestinationAccountName, TenNganHang: payload.BankName, SoTien: formatCurrency(payload.Amount.toString()), OTPCode: OTPCode})
    }

    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            throw new Error("Khong gui duoc ma OTP qua email");
        } else {
            res.json({
                "reply": "hệ thống đã gửi mã OTP đến email của bạn, vui lòng kiểm tra trong mail"
            });
        }
    });

});

//Chuyển khoản từ tài khoản "my-account-number" tới tài khoản khác liên ngân hàng (đã verify OTP)
router.post('/my-account-number/external-transfer', ExternalOTPVerify, async (req, res) => {
    let payload = req.body;
    // payload = {
    //     "MyAccountNumber":147147147,
    //     "DestinationAccountNumber":123123123,
    //     "Amount":250000,
    //     "Message":"Trả tiền nợ tháng 4",
    //     "SenderPayFee":true,
    //     "BankName":"GO",
    //     "OTPCode":"654789"
    // }

    let resultGetNganHangLienKet = await Internal_AccountBankModel.getNganHangLienKet(payload.BankName);
    if (resultGetNganHangLienKet.length === 0) return res.status(406).json({"reply":"Xin lỗi, ngân hàng chưa liên kết với chúng tôi"});

    let TaiKhoanThanhToanNguon = await Internal_AccountBankModel.getTaiKhoanThanhToan(payload.MyAccountNumber);
    if (TaiKhoanThanhToanNguon.length === 0) return res.status(400).json({
        err: 'MyAccountNumber not found'
    });

    let option = {
        "DestinationBankName":payload.BankName,
        "DestinationAccountNumber":payload.DestinationAccountNumber
    }
    let resultRequest = await ExternalFunction.getExternalInfoAccount(option);

    if (resultRequest.StatusCode===503) return res.status(503).json(resultRequest.json);//Dịch vụ ngân hàng liên kết không có sẵn
    if (resultRequest.StatusCode===408) return res.status(408).json(resultRequest.json);//Request quá hạn
    if (resultRequest.StatusCode===406) return res.status(406).json(resultRequest.json);//Ngân hàng chưa liên kết
    if (resultRequest.StatusCode===204) return res.status(204).json(resultRequest.json);//Tài khoản đích không tồn tại
    if (resultRequest.StatusCode===200) payload.DestinationAccountName = resultRequest.json.DestinationAccountName;

    let FeeNguon;
    let FeeDich;
    if (payload.SenderPayFee===true) {
        FeeNguon = config.BANK.ExternalFee;
        FeeDich = 0;
    }
    else {
        FeeNguon = 0;
        FeeDich = config.BANK.ExternalFee;
    }

    let SoDuHienTaiNguon = TaiKhoanThanhToanNguon[0].SoDu;
    // let SoDuHienTaiDich = TaiKhoanThanhToanDich[0].SoDu;

    if ((SoDuHienTaiNguon-config.BANK.MinimumBalance) < (payload.Amount+FeeNguon)) { //MinimumBalance xác định trong tài khoản phải có ít nhất 50 nghìn đồng và không được giao dịch với số tiền này
        return res.status(406).json({
            err: 'Xin lỗi, số dư không đủ để thực hiện giao dịch này, sau giao dịch phải có ít nhất 50.000 đồng',
            CurrentBalance: SoDuHienTaiNguon
        });
    }

    let resultGetKhachHang = await Internal_AccountBankModel.getKhachHang(payload.MyAccountNumber);
    if (resultGetKhachHang.length === 0) return res.status(400).json({
        err: 'MyAccountNumber not found'
    });

    let option2 = {
        "DestinationBankName":payload.BankName,
        "SourceAccountNumber":payload.MyAccountNumber,
        "SourceAccountName":resultGetKhachHang[0].TenKhachHang,
        "DestinationAccountNumber":payload.DestinationAccountNumber,
        "DestinationAccountName":payload.DestinationAccountName,
        "Amount":payload.Amount-FeeDich,
        "Message":payload.Message,
    }
    let resultRequest2 = await ExternalFunction.rechargeExternalAccount(option2);

    if (resultRequest.StatusCode===503) return res.status(503).json(resultRequest.json);//Dịch vụ ngân hàng liên kết không có sẵn
    if (resultRequest.StatusCode===408) return res.status(408).json(resultRequest.json);//Request quá hạn
    if (resultRequest.StatusCode===406) return res.status(406).json(resultRequest.json);//Ngân hàng chưa liên kết
    if (resultRequest2.StatusCode===200) {
        let resultUpdateNguon = await Internal_AccountBankModel.updateSoDu(payload.MyAccountNumber,SoDuHienTaiNguon-payload.Amount-FeeNguon);
        if (resultUpdateNguon.affectedRows!==0) res.json({
            reply: "Giao dịch chuyển khoản thành công"
        });
        else res.status(503).json({
            err: "Giao dịch chuyển khoản thất bại"
        });
    };

    let ts = moment().valueOf();

    let rowLichSuGiaoDich = {
        "MaGiaoDich": payload.MyAccountNumber+'_'+ts,
        "SoTaiKhoanGiaoDich": payload.MyAccountNumber,
        "NgayGiaoDich": moment(ts).format("YYYY-MM-DD HH:mm:ss.SSS"), //thời điểm hiện tại
        "SoTien": payload.Amount-FeeDich,
        "NoiDung": payload.Message,
        "SoTaiKhoanNguoiGui": payload.DestinationAccountNumber,
        "ThongTinNguoiGui": payload.DestinationAccountName,
        "LienNganHang": 1,
        "TenNganHang": payload.BankName,
        "LoaiGiaoDich": "chuyển khoản"
    };

    let resultAdd = await Internal_AccountBankModel.addLichSuGiaoDich(rowLichSuGiaoDich);
    if (resultAdd.affectedRows===0) throw new Error("Khong them duoc lich su giao dich, MaGiaoDich = "+rowLichSuGiaoDich.MaGiaoDich);

});

//Thanh toán nhắc nợ của tài khoản "my-account-number" cho nhắc nợ có MaGiaoDichNhacNo: #123123123_5648585245 (lấy mã OTP)
router.get('/my-account-number/debts-payment', async (req, res) => {
    let payload = req.body;
    // payload = {
    //     "DebtsID":"123123123_5648585245",
    //     "MyAccountNumber":147147147,
    //     "DestinationAccountNumber":123123123,
    //     "Amount":250000,
    //     "Message":"Trả tiền nợ tháng 4"
    // }

    if (payload.DebtsID == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường DebtsID, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (isNaN(payload.MyAccountNumber) || (payload.MyAccountNumber == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường MyAccountNumber, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (isNaN(payload.DestinationAccountNumber) || (payload.DestinationAccountNumber == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường DestinationAccountNumber, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (isNaN(payload.Amount) || (payload.Amount == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Amount, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.Message == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Message, sai định dạng hoặc đang bỏ trống'
        });
    }

    payload.MyAccountNumber = +payload.MyAccountNumber;
    payload.DestinationAccountNumber = +payload.DestinationAccountNumber;
    payload.Amount = +payload.Amount;

    let TaiKhoanThanhToanNguon = await Internal_AccountBankModel.getTaiKhoanThanhToan(payload.MyAccountNumber);
    if (TaiKhoanThanhToanNguon.length === 0) return res.status(400).json({
        err: 'MyAccountNumber not found'
    });

    let TaiKhoanThanhToanDich = await Internal_AccountBankModel.getTaiKhoanThanhToan(payload.DestinationAccountNumber);
    if (TaiKhoanThanhToanDich.length === 0) return res.status(400).json({
        err: 'DestinationAccountNumber not found'
    });

    let resultGetDebts = await Internal_AccountBankModel.getGiaoDichNhacNo(payload.DebtsID, payload.MyAccountNumber, payload.DestinationAccountNumber, payload.Amount);
    if ((resultGetDebts.length === 0)||(resultGetDebts.TinhTrangXuLy===1)) return res.status(400).json({
        err: 'Không tồn tại giao dịch này'
    });

    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "noreply.25bank@gmail.com",
            pass: "hailambank"
        }
    });

    let OTPCode = Math.floor((Math.random() * 900000))+100000; //100000->999999
    let resultDeleteOTP = await Internal_AccountBankModel.deleteOTPCode(payload.MyAccountNumber);

    let rowOTPCode = {
        "SoTaiKhoan": payload.MyAccountNumber,
        "OTPCode": OTPCode,
        "ExpireAt": moment().valueOf()+config.BANK.OTPExpiredTime*1000
    };

    let resultAddOTP = await Internal_AccountBankModel.addOTPCode(rowOTPCode);
    if (resultAddOTP.affectedRows===0) throw new Error("Khong them duoc ma OTP " +OTPCode+" (So Tai Khoan: "+payload.MyAccountNumber+") vao co so du lieu");

    let resultGetKhachHang = await Internal_AccountBankModel.getKhachHang(payload.MyAccountNumber);
    if (resultGetKhachHang.length === 0) return res.status(400).json({
        err: 'MyAccountNumber not found'
    });

    let resultGetKhachHang2 = await Internal_AccountBankModel.getKhachHang(payload.DestinationAccountNumber);
    if (resultGetKhachHang2.length === 0) return res.status(400).json({
        err: 'DestinationAccountNumber not found'
    });

    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'noreply.25bank@gmail.com',
        to: resultGetKhachHang[0].Email,
        subject: OTPCode +' is your OTP 25BANK code',
        html: ejs.render(fs.readFileSync('./Config/OTPmail-template.ejs', 'utf-8'), {TenKhachHang: resultGetKhachHang[0].TenKhachHang, SoTaiKhoanNguoiNhan: payload.DestinationAccountNumber, TenChuSoHuu: resultGetKhachHang2[0].TenKhachHang, TenNganHang: "25Bank", SoTien: formatCurrency(payload.Amount.toString()), OTPCode: OTPCode})
    }

    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            throw new Error("Khong gui duoc ma OTP qua email");
        } else {
            res.json({
                "reply": "hệ thống đã gửi mã OTP đến email của bạn, vui lòng kiểm tra trong mail"
            });
        }
    });

});

//Thanh toán nhắc nợ của tài khoản "my-account-number" cho nhắc nợ có MaGiaoDichNhacNo: #123123123_5648585245 (đã verify OTP)
router.post('/my-account-number/debts-payment', InternalOTPVerify, async (req, res) => {
    let payload = req.body;

    // payload = {
    //     "DebtsID":"123123123_5648585245"
    //     "MyAccountNumber":147147147,
    //     "DestinationAccountNumber":123123123,
    //     "Amount":250000,
    //     "Message":"Trả tiền nợ tháng 4",
    //     "OTPCode":"654789"
    // }

    let TaiKhoanThanhToanNguon = await Internal_AccountBankModel.getTaiKhoanThanhToan(payload.MyAccountNumber);
    if (TaiKhoanThanhToanNguon.length === 0) return res.status(400).json({
        err: 'MyAccountNumber not found'
    });

    let TaiKhoanThanhToanDich = await Internal_AccountBankModel.getTaiKhoanThanhToan(payload.DestinationAccountNumber);
    if (TaiKhoanThanhToanDich.length === 0) return res.status(400).json({
        err: 'DestinationAccountNumber not found'
    });

    let resultGetDebts = await Internal_AccountBankModel.getGiaoDichNhacNo(payload.DebtsID, payload.MyAccountNumber, payload.DestinationAccountNumber, payload.Amount);
    if ((resultGetDebts.length === 0)||(resultGetDebts.TinhTrangXuLy === 1)) return res.status(400).json({
        err: 'Không tồn tại giao dịch này'
    });

    let FeeNguon = config.BANK.InternalFee;
    let SoDuHienTaiNguon = TaiKhoanThanhToanNguon[0].SoDu;
    let SoDuHienTaiDich = TaiKhoanThanhToanDich[0].SoDu;

    if ((SoDuHienTaiNguon-config.BANK.MinimumBalance) < (payload.Amount+FeeNguon)) { //MinimumBalance xác định trong tài khoản phải có ít nhất 50 nghìn đồng và không được giao dịch với số tiền này
        return res.status(406).json({
            err: 'Xin lỗi, số dư không đủ để thực hiện giao dịch này, sau giao dịch phải có ít nhất 50.000 đồng',
            CurrentBalance: SoDuHienTaiNguon
        })
    }

    let resultUpdateNguon = await Internal_AccountBankModel.updateSoDu(payload.MyAccountNumber,SoDuHienTaiNguon-payload.Amount-FeeNguon);
    let resultUpdateDich = await Internal_AccountBankModel.updateSoDu(payload.DestinationAccountNumber,SoDuHienTaiDich+payload.Amount);

    if ((resultUpdateNguon.affectedRows!==0)&&(resultUpdateDich.affectedRows!==0)) res.json({
        reply: "Giao dịch thanh toán nhắc nợ thành công"
    });
    else res.status(503).json({
        err: "Giao dịch thanh toán nhắc nợ thất bại"
    });

    let resultTenDangKy = await Internal_AccountBankModel.getTenDangKy(payload.DestinationAccountNumber);
    let ts = moment().valueOf();

    let rowLichSuGiaoDich = {
        "MaGiaoDich": payload.MyAccountNumber+'_'+ts,
        "SoTaiKhoanGiaoDich": payload.MyAccountNumber,
        "NgayGiaoDich": moment(ts).format("YYYY-MM-DD HH:mm:ss.SSS"), //thời điểm hiện tại
        "SoTien": payload.Amount,
        "NoiDung": payload.Message,
        "SoTaiKhoanNguoiGui": payload.DestinationAccountNumber,
        "ThongTinNguoiGui": resultTenDangKy[0].TenKhachHang,
        "LienNganHang": 0,
        "TenNganHang": "25Bank",
        "LoaiGiaoDich": "chuyển khoản"
    };

    let resultAdd = await Internal_AccountBankModel.addLichSuGiaoDich(rowLichSuGiaoDich);
    if (resultAdd.affectedRows===0) throw new Error("Khong them duoc lich su giao dich, MaGiaoDich = "+rowLichSuGiaoDich.MaGiaoDich);

    let resultUpdate = await Internal_AccountBankModel.updateTinhTrangXuLy(payload.DebtsID);

    let rowGiaoDichNhacNo = {
        "MaGiaoDichNhacNo": payload.DebtsID,
        "SoTaiKhoanNguoiGui": payload.MyAccountNumber,
        "SoTaiKhoanNguoiNhan": payload.DestinationAccountNumber,
        "NgayGiaoDich": moment(ts).format("YYYY-MM-DD HH:mm:ss.SSS"), //thời điểm hiện tại
        "SoTien": payload.Amount,
        "NoiDung": payload.Message,
        "LoaiGiaoDich": "đã thanh toán",
        "TinhTrangXuLy": 1
    };
    let resultAddGiaoDichNhacNo = await Internal_AccountBankModel.addGiaoDichNhacNo(rowGiaoDichNhacNo);

});

function formatCurrency(number){
    var n = number.split('').reverse().join("");
    var n2 = n.replace(/\d\d\d(?!$)/g, "$&.");    
    return  n2.split('').reverse().join('');
}

module.exports=router;