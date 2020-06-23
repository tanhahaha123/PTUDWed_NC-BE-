const express = require('express');
const moment=require('moment');
const bcrypt = require('bcryptjs');

const employeeManagement = require('../../Models/Admin/EmployeeManagement.model');

const router = express.Router();

//Get thông tin toàn bộ danh sách nhân viên
router.get('/employees', async(req, res) => {
    const resultList = await employeeManagement.all();
    res.json(resultList);
});

// Get thông tin nhân viên bất kì theo id
router.get('/employees/:id', async(req, res) => {
    if (isNaN(req.params.id)) {
        return res.status(400).json({
          err: 'Invalid ID.'
        });
    }
    const IDEmployee = +req.params.id;
    const resultList = await employeeManagement.getEmployeeByID(IDEmployee);
    if(resultList.length === 0){
        return res.status(400).json({
            err: 'Nhan vien khong duoc tim thay'
        });
    };
    res.status(200).json(resultList);
});

// Thêm mới một nhân viên
router.post('/employees', async(req, res) => {
    let payload = req.body;
    // payload = {
    //     "TenDangNhap": "employee3",
    //     "MatKhau": "123456",
    //     "Email": "accountemployee3@gmail.com",
    //     "TenNhanVien": "Park Hangseo"
    // }

    if (payload.TenDangNhap == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường TenDangNhap, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.MatKhau == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường MatKhau, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.Email == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Email, sai định dạng hoặc đang bỏ trống'
        });
    };

    //hash mat khau
    const hash = bcrypt.hashSync(payload.MatKhau, 8);
    payload.MatKhau = hash;

    let rowEmployee = {
        "TenDangNhap":payload.TenDangNhap,
        "MatKhau":payload.MatKhau,
        "Email":payload.Email,
        "TenNhanVien":payload.TenNhanVien,
        "GioiTinh": payload.GioiTinh? payload.GioiTinh :'',
        "SoCMND": payload.SoCMND? payload.SoCMND : '',
        "NgaySinh": payload.NgaySinh? payload.NgaySinh : "1980/1/1",
        "SoDienThoai": payload.SoDienThoai? payload.SoDienThoai : '',
        "DiaChi": payload.DiaChi? payload.DiaChi : '',
        "ChucVu": payload.ChucVu? payload.ChucVu : ''
    };

    let resultAdd = await employeeManagement.addEmployee(rowEmployee);
    if (resultAdd.affectedRows===0) throw new Error("Khong duoc them moi, TenDangNhap = "+rowEmployee.TenDangNhap);

    let result= await employeeManagement.all();
    res.status(201).json({
        success: true,
        result: result
    });
});


// Chỉnh sửa thông tin nhân viên
router.patch('/employees', async(req, res) => {
    let payload = req.body;
    // payload = {
    //     "TenDangNhap": "employee3",  (can't)
    //     "MatKhau": "123456", (can)
    //     "Email": "accountemployee3@gmail.com", (can)
    //     "TenNhanVien": "Park Hangseo" (can),
    //     "GioiTinh": "Nam" (can),
    //     "SoCMND": "0123456789" (can),
    //     "NgaySinh": "1980/1/1" (can),
    //     "SoDienThoai": "123456789", (can)
    //     "DiaChi": "142 Nguyen Trong Tuyen, P8, Q.PN, TP.HCM", (can)
    //     "ChucVu": "Nhan vien giao do" (can)
    // }

    if (payload.TenDangNhap == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường TenDangNhap, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.MatKhau == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường MatKhau, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.Email == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Email, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.TenNhanVien == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Email, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.GioiTinh == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Email, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.SoDienThoai == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Email, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.SoCMND == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Email, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.NgaySinh == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Email, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.DiaChi == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Email, sai định dạng hoặc đang bỏ trống'
        });
    }

    if (payload.ChucVu == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường Email, sai định dạng hoặc đang bỏ trống'
        });
    }
    

    let rowEmployee = {
        "TenDangNhap":payload.TenDangNhap,
        "MatKhau":payload.MatKhau,
        "Email":payload.Email,
        "TenNhanVien":payload.TenNhanVien,
        "GioiTinh": payload.GioiTinh? payload.GioiTinh :'',
        "SoCMND": payload.SoCMND? payload.SoCMND : '',
        "NgaySinh": payload.NgaySinh? payload.NgaySinh : "1980/1/1",
        "SoDienThoai": payload.SoDienThoai? payload.SoDienThoai : '',
        "DiaChi": payload.DiaChi? payload.DiaChi : '',
        "ChucVu": payload.ChucVu? payload.ChucVu : ''
    };

    let resultUpdate = await Internal_AccountBankModel.updateThongTinNguoiNhan(rowDanhSachNguoiNhan);
    if (resultUpdate.affectedRows===0) return res.status(503).json({
        err: 'Không thể update, vui lòng kiểm tra đầu vào'
    });

    res.json({"reply":"Chỉnh sửa thông tin nhân viên thành công"});
});


//Xóa thông tin nhân viên
router.delete('/employees', async (req, res) => {
    let payload = req.body;
    // payload = {
    //     "TenDangNhap": "accountnhanvien1"
    // }

    if ((payload.TenDangNhap == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường SoTaiKhoanNguoiNhan, sai định dạng hoặc đang bỏ trống'
        });
    }


    let resultList = await employeeManagement.deleteEmployee(payload.TenDangNhap);

    if (resultList.affectedRows===0) 
        return res.status(400).json({
            err: 'TenDangNhap không tồn tại. Vui lòng kiểm tra lại.'
        })

    res.json({"reply":"Xóa nhân viên thành công"});
});

module.exports = router;