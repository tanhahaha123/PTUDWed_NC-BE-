const moment = require('moment');

const Internal_AccountBankModel = require('../Models/Internal_AccountBank.model');

module.exports =  async (req, res, next)=>{
		let payload = req.body;
	    // payload = {
		//     "MyAccountNumber":147147147,
		//     "DestinationAccountNumber":123123123,
		//     "Amount":250000,
		//     "Message":"Trả tiền nợ tháng 4",
		//     "SenderPayFee":true,
		//     "OTPCode":"654789"
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

	    if (payload.OTPCode == null) {
	        return res.status(400).json({
	            err: 'Vui lòng kiểm tra lại trường OTPCode, sai định dạng hoặc đang bỏ trống'
	        });
	    }

	    payload.MyAccountNumber = +payload.MyAccountNumber;
	    payload.DestinationAccountNumber = +payload.DestinationAccountNumber;
	    payload.Amount = +payload.Amount;
	    payload.OTPCode = payload.OTPCode.toString();

	    let resultOTP = await Internal_AccountBankModel.getOTPCode(payload.MyAccountNumber,payload.OTPCode);
	    if (resultOTP.length===0) return res.status(400).json({
	    	err: "OTP not found"
	    });

	    let ExpireAt = +resultOTP[0].ExpireAt;
	    if (moment().valueOf() > ExpireAt) return res.status(408).json({
	    	err: "OTP expired"
	    });

	    let resultDeleteOTP = await Internal_AccountBankModel.deleteOTPCode(payload.MyAccountNumber);

		next();
	}