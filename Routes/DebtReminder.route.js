const express = require('express');
const moment = require('moment');

const debtReminderModel = require('../Models/DebtReminder.model');
const { getDebtReminderByID } = require('../Models/DebtReminder.model');

const router = express.Router();

// ______________ THÔNG TIN CHI TIẾT MỘT TÀI KHOẢN THEO SỐ TÀI KHOẢN______________
router.get('/detail-info/:stk', async (req, res) => {
    //console.log(typeof req.params.stk);
    const payload = {
        SourceAccountNumber: parseInt(req.params.stk)
    }

    //Kiem tra tinh hop le
    if (isNaN(payload.SourceAccountNumber)) {
        return res.status(404).json({
          err: 'Tài khoản sai định dạng, vui lòng nhập 9 chữ số.'
        });
      }
    // console.log("HERE");
    const stk = +payload.SourceAccountNumber || 0;
    const list = await debtReminderModel.detail(stk);
    if (list.length===0) {
      return res.json({
          err: 'Tài khoản không tồn tại'
      })
    }

    const ret={
        ...list[0]
    }
    return res.status(200).json(ret);
});

//_____________________XEM DANH SÁCH NỢ____________________
router.get('/:stk', async(req, res) => {
    // payload = {
    //     "SourceAccountNumber":123123123,
    // }
    
    let payload = req.params;
    console.log(payload.stk);
    if (isNaN(payload.stk) || (payload.stk == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường SourceAccountNumber, sai định dạng hoặc đang bỏ trống'
        });
    }
    // _______danh sách do bản thân tạo__________
    let result1 = await debtReminderModel.getDebtReminderFromMe(payload.stk);
    // _______danh sách nhắc nợ do người khác gửi___________
    let result2 = await debtReminderModel.getDebtReminderFromOthers(payload.stk);
    return res.status(200).json({
        source: result1,
        destination: result2
    })

})

//_____________________TẠO NHẮC NỢ__________________
router.post('/', async (req, res) => {
  let payload = req.body;

  // payload = {
    //   "SourceAccountNumber":123123123,
    //   "DestinationAccountNumber":258258258,
    //   "Amount":500000, 
    //   "Message":"Yeu cau tra no",
  // }

  if (isNaN(payload.SourceAccountNumber) || (payload.SourceAccountNumber == null)) {
      return res.status(400).json({
          err: 'Vui lòng kiểm tra lại trường SourceAccountNumber, sai định dạng hoặc đang bỏ trống'
      });
  }

  if (isNaN(payload.DestinationAccountNumber) || (payload.DestinationAccountNumber == null)) {
      return res.status(400).json({
          err: 'Vui lòng kiểm tra lại trường DestinationAccountNumber, sai định dạng hoặc đang bỏ trống'
      });
  }

  if (isNaN(payload.Amount) || (payload.Amount == null) || (+payload.Amount <=0)) {
      return res.status(400).json({
          err: 'Vui lòng kiểm tra lại trường Amount, sai định dạng hoặc đang bỏ trống'
      });
  }

  if (payload.Message == null){
      return res.status(400).json({
          err: 'Vui lòng kiểm tra lại trường Message, không được bỏ trống'
      });     
  }

  //parse from string to number
  payload.DestinationAccountNumber = +payload.DestinationAccountNumber;
  payload.SourceAccountNumber = +payload.SourceAccountNumber;
  payload.Amount = +payload.Amount;

  let LenhNhacNo = await debtReminderModel.getTaiKhoanThanhToan(payload.DestinationAccountNumber);
  if (LenhNhacNo.length===0) {
      return res.status(400).json({
          err: 'DestinationAccountNumber not found'
      })
  }

  //let SoDuHienTai = TaiKhoanThanhToanDich[0].SoDu;
  //let resultUpdate = await Partner_AccountBankModel.updateSoDu(payload.DestinationAccountNumber,SoDuHienTai+payload.Amount);
  // let resultUpdate = await debtReminderModel.updateGiaoDichNhacNo(payload);
  // if (resultUpdate.affectedRows===0) return res.status(503).json({
  //     err: 'Service Unavailable'
  // });

  let rowLichSuNhacNo = {
      "MaGiaoDichNhacNo": payload.SourceAccountNumber+'_'+ payload.DestinationAccountNumber,
      "SoTaiKhoanNguoiGui": payload.SourceAccountNumber +"",
      "SoTaiKhoanNguoiNhan": payload.DestinationAccountNumber+ "",
      "NgayGiaoDich": moment().format("YYYY-MM-DD HH:mm:ss.SSS"), //thời điểm hiện tại
      "SoTien": payload.Amount,
      "NoiDung": payload.Message,
      "LoaiGiaoDich": "đã tạo",
      "TinhTrangXuLy": 1,
  }

  let resultAdd = await debtReminderModel.addLichSuNhacNo(rowLichSuNhacNo);
  if (resultAdd.affectedRows===0) throw new Error("Khong them duoc lich su nhac no, MaGiaoDichNhacNo = "+rowLichSuGiaoDich.MaGiaoDichNhacNo);

  res.json({"reply":"Nhac no thành công"});
});

// Hủy nhắc nợ
// Thay đổi DB trạng thái LoaiGiaoDich = đã hủy
router.put('/', async(req, res) => {
    // payload = {
    //     "idGiaoDichNhacNo": 2,
    //     "NoiDung": "toi da tra cho anh roi",
    // }

    let payload = req.body;

    if (isNaN(payload.idGiaoDichNhacNo) || (payload.idGiaoDichNhacNo == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại nội dung, sai định dạng hoặc đang bỏ trống'
        });
    };
    if ((payload.NoiDung == null)) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại nội dung, sai định dạng hoặc đang bỏ trống'
        });
    };

    const debtReminderByID = await debtReminderModel.getDebtReminderByID(payload.idGiaoDichNhacNo);
    if (debtReminderByID.length===0) {
      return res.status(400).json({
          err: 'ID not found'
      })
    }

    let rowLichSuNhacNo = {
        "idGiaoDichNhacNo": payload.idGiaoDichNhacNo,
        "NoiDung": payload.NoiDung,
        "LoaiGiaoDich": "đã hủy",
    }
  
    console.log(rowLichSuNhacNo);
  
    let result = await debtReminderModel.updateDebtReminder(rowLichSuNhacNo);
    if (result.affectedRows===0) throw new Error("Khong thay doi duoc giao dich, idGiaoDichNhacNo = "+rowLichSuNhacNo.idGiaoDichNhacNo);
    // _______danh sách do bản thân tạo__________
    let result1 = await debtReminderModel.getDebtReminderFromMe(payload.stk);
    // _______danh sách nhắc nợ do người khác gửi___________
    let result2 = await debtReminderModel.getDebtReminderFromOthers(payload.stk);
    return res.status(200).json({
        source: result1,
        destination: result2
    })

    // res.status(200).json({
    //     success: true,
    //     ...resultChange[0]
    // });

});

module.exports = router;