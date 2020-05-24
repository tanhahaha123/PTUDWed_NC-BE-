const fs = require('fs');
const NodeRSA = require('node-rsa');
const openpgp = require('openpgp');

const Partner_AccountBankModel = require('../Models/Partner_AccountBank.model');

const MyRSA_PrivateKey = fs.readFileSync('Keys/RSA/MyPrivateKey.pem','utf8');
const MyRSA_PrivateKeyObject = new NodeRSA(MyRSA_PrivateKey);


module.exports =  async (req, res, next)=>{
		let ReqBody = req.body
		// ReqBody = {
		// 	"Encrypted":"ldfkgjlkfjglkfj",//payload đã encrypt
		// 	"Signed":"fglfjglfjlf"//chữ ký đã ký trên payload
		// }
		if (ReqBody.Encrypted == null){
	        return res.status(400).json({
	            err: 'Vui lòng kiểm tra lại trường Encrypted, không được bỏ trống'
	        });     
	    }
	    if (ReqBody.Signed == null){
	        return res.status(400).json({
	            err: 'Vui lòng kiểm tra lại trường Signed, không được bỏ trống'
	        });     
	    }

	    let MsgDecrypted;
	    try {
	    	MsgDecrypted = MyRSA_PrivateKeyObject.decrypt(ReqBody.Encrypted,"utf8");
	    }
		catch(err)
		{
			return res.status(400).json({"err":"Không thể decrypt, vui lòng kiểm tra lại Encrypted"});
		}

		req.MyPayload = JSON.parse(MsgDecrypted);
		// req.MyPayload = {
		// 	"BankName":"...",
		// 	......
		//	"iat":9898374934
		// }

		if (req.MyPayload.BankName == null){
	        return res.status(400).json({
	            err: 'Vui lòng kiểm tra lại trường BankName'
	        });     
	    }
		let data = await Partner_AccountBankModel.checkBankPartner(req.MyPayload.BankName);
		if (data.length === 0) return res.status(406).json({"reply":"Xin lỗi, ngân hàng chưa liên kết với chúng tôi"});

		const PartnerRSA_PublicKey = fs.readFileSync('Keys/RSA/'+req.MyPayload.BankName+'.pem','utf8');
		const PartnerRSA_PublicKeyObject = new NodeRSA(PartnerRSA_PublicKey);
		let is_Signed = PartnerRSA_PublicKeyObject.verify(MsgDecrypted,ReqBody.Signed,"utf8","base64");
		if (is_Signed===false) return res.status(400).json({"err":"không thể xác nhận chữ ký, vui lòng ký trên JSON payload được dùng để encrypt!"});

		req.Verified = true;
		next();
	}