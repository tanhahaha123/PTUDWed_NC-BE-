const express = require('express');
const moment = require('moment');
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const fs = require("fs");
const bcrypt = require('bcryptjs');

const config = require('../Config/config.json');
const ForgotPasswordModel = require('../Models/ForgotPassword.model');

const router = express.Router();

router.get('/get-code', async (req, res) => {
	let payload = req.body;
	// payload = {
    //     "TenDangNhap":"myaccount1",
    //     "Email":"myaccount1@gmail.com"
    // }

    if (payload.TenDangNhap == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường TenDangNhap, sai định dạng hoặc đang bỏ trống'
        });
    }
    if (payload.Email == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Email, sai định dạng hoặc đang bỏ trống'
        });
    }

    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "noreply.25bank@gmail.com",
            pass: "hailambank"
        }
    });

    let OTPCode = Math.floor((Math.random() * 900000))+100000; //100000->999999
    let resultDeleteOTP = await ForgotPasswordModel.deleteForgotPasswordOTPCode(payload.TenDangNhap,payload.Email);

    let rowOTPCode = {
        "TenDangNhap": payload.TenDangNhap,
        "Email": payload.Email,
        "OTPCode": OTPCode,
        "ExpireAt": moment().valueOf()+config.BANK.ForgotPasswordOTPExpiredTime*1000
    };

    let resultGetKhachHang = await ForgotPasswordModel.getKhachHang(payload.TenDangNhap,payload.Email);
    if (resultGetKhachHang.length === 0) return res.json({ //dù sai vẫn thông báo
        "reply": "hệ thống đã gửi mã OTP đến email của bạn, vui lòng kiểm tra trong mail"
    });

    let resultAddOTP = await ForgotPasswordModel.addForgotPasswordOTPCode(rowOTPCode);
    if (resultAddOTP.affectedRows===0) throw new Error("Khong them duoc ma Forgot Password OTP " +OTPCode+" (Email: "+payload.Email+") vao co so du lieu");


    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'noreply.25bank@gmail.com',
        to: payload.Email,
        subject: OTPCode +' is your 25BANK forgot password OTP code',
        html: ejs.render(fs.readFileSync('./Config/ForgotPasswordOTPmail-template.ejs', 'utf-8'), {TenKhachHang: resultGetKhachHang[0].TenKhachHang, OTPCode: OTPCode})
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

router.post('/check-code', async (req, res) => {
    let payload = req.body;
    // payload = {
    //     "TenDangNhap":"myaccount1",
    //     "Email":"myaccount1@gmail.com",
    //     "OTPCode":384778
    // }

    if (payload.TenDangNhap == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường TenDangNhap, sai định dạng hoặc đang bỏ trống'
        });
    };
    if (payload.Email == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Email, sai định dạng hoặc đang bỏ trống'
        });
    };
    if (payload.OTPCode == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường OTPCode, sai định dạng hoặc đang bỏ trống'
        });
    };

    payload.OTPCode = payload.OTPCode.toString();

    let resultOTP = await ForgotPasswordModel.getForgotPasswordOTPCode(payload.TenDangNhap,payload.Email,payload.OTPCode);
    if (resultOTP.length===0) {
        // let resultDeleteOTP = await ForgotPasswordModel.deleteForgotPasswordOTPCode(payload.TenDangNhap,payload.Email);
        return res.status(400).json({
            err: "OTP not found"
        });
    }

    let ExpireAt = +resultOTP[0].ExpireAt;
    if (moment().valueOf() > ExpireAt) {
        let resultDeleteOTP = await ForgotPasswordModel.deleteForgotPasswordOTPCode(payload.TenDangNhap,payload.Email);
        return res.status(408).json({
            err: "OTP expired"
        });
    }

    res.json({
        "reply": "OTP OK"
    });
});

router.post('/verify-code-and-recovery-password', async (req, res) => {
    let payload = req.body;
    // payload = {
    //     "TenDangNhap":"myaccount1",
    //     "Email":"myaccount1@gmail.com",
    //     "MatKhau":"hihi",
    //     "OTPCode":384778
    // }

    if (payload.TenDangNhap == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường TenDangNhap, sai định dạng hoặc đang bỏ trống'
        });
    };
    if (payload.Email == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Email, sai định dạng hoặc đang bỏ trống'
        });
    };
    if (payload.MatKhau == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường MatKhau, sai định dạng hoặc đang bỏ trống'
        });
    };
    if (payload.OTPCode == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường OTPCode, sai định dạng hoặc đang bỏ trống'
        });
    };

    payload.OTPCode = payload.OTPCode.toString();

    let resultOTP = await ForgotPasswordModel.getForgotPasswordOTPCode(payload.TenDangNhap,payload.Email,payload.OTPCode);
    if (resultOTP.length===0) {
        return res.status(400).json({
            err: "OTP not found"
        });
    }

    let ExpireAt = +resultOTP[0].ExpireAt;
    if (moment().valueOf() > ExpireAt) {
        return res.status(408).json({
            err: "OTP expired"
        });
    }

    let resultDeleteOTP = await ForgotPasswordModel.deleteForgotPasswordOTPCode(payload.TenDangNhap,payload.Email);

    let hashPassword = bcrypt.hashSync(payload.MatKhau,8);
    let resultUpdatePassword = await ForgotPasswordModel.updatePassword(payload.TenDangNhap,payload.Email,hashPassword);
    if (resultUpdatePassword.affectedRows===0) return res.status(503).json({
        reply: "Đặt lại mật khẩu thất bại"
    });
    res.json({reply: "Đặt lại mật khẩu thành công"});
});

module.exports=router;