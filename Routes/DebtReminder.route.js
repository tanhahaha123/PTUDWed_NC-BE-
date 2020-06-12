const express = require('express');
const moment = require('moment');

const debtReminderModel = require('../Models/DebtReminder.model');

const router = express.Router();

//Chi tiet thong tin 1 tai khoan
//Khong hien thi so du
router.get('/detail-info/:stk', async (req, res) => {
    //Kiem tra tinh hop le
    if (isNaN(req.params.stk)) {
        return res.status(400).json({
          err: 'Invalid STK.'
        });
      }

    const stk = +req.params.stk || 0;
    const list = await debtReminderModel.detail(stk);
    if (list.length===0) {
      return res.status(400).json({
          err: 'DestinationAccountNumber not found'
      })
    }

    const ret={
        ...list[0]
    }
    res.json(ret);
});

//Nạp tiền vào tài khoản từ ngân hàng liên kết
router.post('/create-debt-reminder', async (req, res) => {
  let payload = req.body;

  // payload = {
  //     "SourceAccountNumber":123123123,
  //     "DestinationAccountNumber":258258258,
  //     "Amount":500000, 
  //     "Message":"Yeu cau tra no",
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
      "LoaiGiaoDich": "da tao",
      "TinhTrangXuLy": 1,
  }

  console.log(rowLichSuNhacNo);

  let resultAdd = await debtReminderModel.addLichSuNhacNo(rowLichSuNhacNo);
  if (resultAdd.affectedRows===0) throw new Error("Khong them duoc lich su nhac no, MaGiaoDichNhacNo = "+rowLichSuGiaoDich.MaGiaoDichNhacNo);

  res.json({"reply":"Nhac no thành công"});
});

module.exports = router;