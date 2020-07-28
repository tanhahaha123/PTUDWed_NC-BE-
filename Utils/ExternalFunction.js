const fs = require('fs');
const request = require('request');
const moment = require('moment');
const md5 = require('md5');
const NodeRSA = require('node-rsa');
const openpgp = require('openpgp');

const config = require('../Config/config.json');
const External_AccountBankModel = require('../Models/External_AccountBank.model');

//RSA init
const MyBank_PrivateKey = fs.readFileSync('Keys/RSA/MyPrivateKey.pem','utf8');
const MyBank_PrivateKeyObject = new NodeRSA(MyBank_PrivateKey);

//PGP init
const passphrasePGP = `25bank`; // what the private key is encrypted with
const MyBank_privateKeyArmoredPGP = fs.readFileSync('Keys/PGP/MyPrivateKey.pem','utf8');

const PartnerBank_publicKeyArmoredPGP = fs.readFileSync('Keys/PGP/30Bank.pem','utf8');

//Truy vấn thông tin tài khoản của ngân hàng khác
module.exports.getExternalInfoAccount = async (payload) => {
    // payload = {
    //     "DestinationBankName":".....",
    //     "DestinationAccountNumber":102102102
    // }

    let DestinationAccountNumber = payload.DestinationAccountNumber;
    let DestinationBankName = payload.DestinationBankName;

    if (DestinationBankName == null){
        return {StatusCode: 400, json:{err: 'Vui lòng kiểm tra lại trường DestinationBankName, sai định dạng hoặc đang bỏ trống'}};     
    }
    if (isNaN(DestinationAccountNumber) || (DestinationAccountNumber == null)){
        return {StatusCode:400, json:{err: 'Vui lòng kiểm tra lại trường DestinationAccountNumber, sai định dạng hoặc đang bỏ trống'}};     
    }

    let data = await External_AccountBankModel.checkBankPartner(DestinationBankName);
    if (data.length === 0) return {StatusCode:406, json:{"reply":"Xin lỗi, không tìm thấy ngân hàng liên kết trong cơ sở dữ liệu"}};

    DestinationAccountNumber = +DestinationAccountNumber;

    switch (DestinationBankName) {
        // case "SimulatorBank": //giả lập ngân hàng mình (các nhóm liên kết khác thay đổi API và tham số liên tục T_T, khó để test)
        // {
        //     const SimulatorBankKey = fs.readFileSync('Keys/RSA/SimulatorBank.pem','utf8');
        //     const SimulatorBankKeyObject = new NodeRSA(SimulatorBankKey);

        //     const iat = moment().valueOf();
        //     let PayloadBody = {"BankName":"25Bank","DestinationAccountNumber":DestinationAccountNumber,"iat":iat};
        //     let Encrypted = SimulatorBankKeyObject.encrypt(PayloadBody,"base64");
        //     let Signed = MyBank_PrivateKeyObject.sign(PayloadBody,"base64");
        //     let reqBody = {"Encrypted":Encrypted, "Signed":Signed};

        //     let option = {
        //         method: 'GET',
        //         url: 'http://localhost:3001/api/partner/account-bank/destination-account',
        //         json: reqBody
        //     };
        //     let resultRequest;
        //     try {
        //         resultRequest = await doRequest(option);
        //     } catch(err) {
        //         return {StatusCode:503, json:{"reply": "Dịch vụ của ngân hàng liên kết không sẵn có"}};
        //     };

        //     if (resultRequest.response.statusCode===200) return {StatusCode:200, json: {"DestinationAccountName":resultRequest.body.TenKhachHang,...resultRequest.body}};
        //     else return {StatusCode: resultRequest.response.statusCode, json: resultRequest.body};

        //     break;
        // }
        case "GO":
        {
            const ts = moment().valueOf();
            const hashSecretKey = md5("Infymt");

            const reqBody = {"account_number":DestinationAccountNumber.toString()};

            let option = {
                method: 'POST',
                url: 'https://tts-bank.herokuapp.com/partner/check',
                headers: {
                    "partnerCode":"25Bank",
                    "ts": ts,
                    "sig": md5(ts + JSON.stringify(reqBody) + hashSecretKey)
                },
                json: reqBody
            };
            let resultRequest;
            try {
                resultRequest = await doRequest(option);
            } catch(err) {
                return {StatusCode:503, json:{"reply": "Dịch vụ của ngân hàng liên kết không sẵn có"}};
            }

            try {
                resultRequest.body = JSON.parse(resultRequest.body);
            } catch(err){
                //ignore
            }

            if (resultRequest.response.statusCode===200) return {StatusCode:200, json: {"TenKhachHang":resultRequest.body.fullname,...resultRequest.body}};
            else return {StatusCode: resultRequest.response.statusCode, json: resultRequest.body};

            break;
        }
        case "37Bank":
        {
            const reqBody = {"bankNumber":DestinationAccountNumber.toString()};

            let option = {
                method: 'GET',
                url: 'https://ibanking37.herokuapp.com/v1/third-party/accounts',
                headers: {
                    "X-Third-Party-Name":"25Bank"
                },
                qs: reqBody //querry string similar "params axios"
            };
            let resultRequest;
            try {
                resultRequest = await doRequest(option);
            } catch(err) {
                return {StatusCode:503, json:{"reply": "Dịch vụ của ngân hàng liên kết không sẵn có"}};
            }

            try {
                resultRequest.body = JSON.parse(resultRequest.body);
            } catch(err){
                //ignore
            }

            if (resultRequest.response.statusCode===200) return {StatusCode:200, json: {"TenKhachHang":resultRequest.body.data.bankName,...resultRequest.body}};
            else return {StatusCode: resultRequest.response.statusCode, json: resultRequest.body};

            break;
        }
        case "30Bank":
        {
            const { keys: [privateKey_me] } = await openpgp.key.readArmored(MyBank_privateKeyArmoredPGP);
            await privateKey_me.decrypt(passphrasePGP);

            const reqBody = {"account_number":DestinationAccountNumber.toString(),"request_time":moment().valueOf()};

            const { data: encrypted } = await openpgp.encrypt({
                message: openpgp.message.fromText(JSON.stringify(reqBody)),                 // input as Message object
                publicKeys: (await openpgp.key.readArmored(PartnerBank_publicKeyArmoredPGP)).keys, // for encryption
                privateKeys: [privateKey_me]                                           // for signing (optional)
            });

            let option = {
                method: 'POST',
                url: 'https://internet-banking-30.herokuapp.com/api/account/info',
                headers: {
                    "Partner-Code":"Bank25"
                },
                json: {"message":encrypted}
            };
            let resultRequest;
            try {
                resultRequest = await doRequest(option);
            } catch(err) {
                return {StatusCode:503, json:{"reply": "Dịch vụ của ngân hàng liên kết không sẵn có"}};
            }

            try {
                resultRequest.body = JSON.parse(resultRequest.body);
            } catch(err){
                //ignore
            }

            if (resultRequest.response.statusCode===200) {
                if (resultRequest.body.code===0) return {StatusCode:200, json: {"TenKhachHang":resultRequest.body.data.account_name,...resultRequest.body}};
                else return {StatusCode: 200, json: resultRequest.body};
            }
            else return {StatusCode: resultRequest.response.statusCode, json: resultRequest.body};

            break;
        }
        default:
        {
            return {StatusCode: 406, json: {"reply":"Xin lỗi, không tìm thấy ngân hàng liên kết trong cơ sở dữ liệu"}};
            break;
        }
    }
};

//Nạp tiền vào tài khoản ngân hàng khác

module.exports.rechargeExternalAccount = async (payload) => {

    // payload = {
    //     "DestinationBankName":"AGRIBANK",
    //     "SourceAccountNumber":258258258,
    //     "SourceAccountName":"Đặng Văn Lâm",
    //     "DestinationAccountNumber":102102102,
    //     "DestinationAccountName":"Nguyễn Thanh Nam",
    //     "Amount":1250000, //1 triệu 2 trăm 50 nghìn
    //     "Message":"thanh toán tiền phòng",
    // }

    if (payload.DestinationBankName == null){
        return {StatusCode:400, json:{err: 'Vui lòng kiểm tra lại trường DestinationBankName, sai định dạng hoặc đang bỏ trống'}};     
    }

    if (isNaN(payload.SourceAccountNumber) || (payload.SourceAccountNumber == null)) {
        return {StatusCode:400, json:{err: 'Vui lòng kiểm tra lại trường SourceAccountNumber, sai định dạng hoặc đang bỏ trống'}};
    }

    if (payload.SourceAccountName == null) {
        return {StatusCode:400, json:{err: 'Vui lòng kiểm tra lại trường SourceAccountName, sai định dạng hoặc đang bỏ trống'}};
    }

    if (isNaN(payload.DestinationAccountNumber) || (payload.DestinationAccountNumber == null)) {
        return {StatusCode:400, json:{err: 'Vui lòng kiểm tra lại trường DestinationAccountNumber, sai định dạng hoặc đang bỏ trống'}};
    }

    if (payload.DestinationAccountName == null) {
        return {StatusCode:400, json:{err: 'Vui lòng kiểm tra lại trường DestinationAccountName, sai định dạng hoặc đang bỏ trống'}};
    }

    if (isNaN(payload.Amount) || (payload.Amount == null) || (+payload.Amount <=0)) {
        return {StatusCode:400, json:{err: 'Vui lòng kiểm tra lại trường Amount, sai định dạng hoặc đang bỏ trống'}};
    }

    if (payload.Message == null){
        return {StatusCode:400, json:{err: 'Vui lòng kiểm tra lại trường Message, sai định dạng hoặc đang bỏ trống'}};     
    }

    let data = await External_AccountBankModel.checkBankPartner(payload.DestinationBankName);
    if (data.length === 0) return {StatusCode:406, json:{"reply":"Xin lỗi, không tìm thấy ngân hàng liên kết trong cơ sở dữ liệu"}};

    //parse from string to number
    payload.DestinationAccountNumber = +payload.DestinationAccountNumber;
    payload.SourceAccountNumber = +payload.SourceAccountNumber;
    payload.Amount = +payload.Amount;

    let TaiKhoanThanhToanNguon = await External_AccountBankModel.getTaiKhoanThanhToan(payload.SourceAccountNumber);
    if (TaiKhoanThanhToanNguon.length===0) {
        return {StatusCode:400, json:{err: 'SourceAccountNumber not found'}};
    }

    let SoDuHienTai = TaiKhoanThanhToanNguon[0].SoDu;
    if ((SoDuHienTai-config.BANK.MinimumBalance) < payload.Amount) { //MinimumBalance xác định trong tài khoản phải có ít nhất 50 nghìn đồng và không được giao dịch với số tiền này
        return {StatusCode:400, json:{err: 'Xin lỗi, số dư không đủ để thực hiện giao dịch này, sau giao dịch phải có ít nhất 50.000 đồng',CurrentBalance: SoDuHienTai}};
    }

    switch (payload.DestinationBankName) {
        // case "SimulatorBank":
        // {
        //     const SimulatorBankKey = fs.readFileSync('Keys/RSA/SimulatorBank.pem','utf8');
        //     const SimulatorBankKeyObject = new NodeRSA(SimulatorBankKey);

        //     const iat = moment().valueOf();
        //     let PayloadBody = {"BankName":"25Bank","SourceAccountNumber":payload.SourceAccountNumber,"SourceAccountName":payload.SourceAccountName,"DestinationAccountNumber":payload.DestinationAccountNumber,"Amount":payload.Amount,"Message":payload.Message,"iat":iat};
        //     let Encrypted = SimulatorBankKeyObject.encrypt(PayloadBody,"base64");
        //     let Signed = MyBank_PrivateKeyObject.sign(PayloadBody,"base64");
        //     let reqBody = {"Encrypted":Encrypted, "Signed":Signed};

        //     let option = {
        //         method: 'POST',
        //         url: 'http://localhost:3001/api/partner/account-bank/destination-account/recharge',
        //         json: reqBody
        //     };
        //     let resultRequest;
        //     try {
        //         resultRequest = await doRequest(option);
        //     } catch(err) {
        //         return {StatusCode:503, json:{"reply": "Dịch vụ của ngân hàng liên kết không sẵn có"}};
        //     };
        //     return {StatusCode: resultRequest.response.statusCode, json: resultRequest.body};
        //     // if (resultRequest.response.statusCode===200) return {StatusCode:200, json: {"DestinationAccountName":resultRequest.body.TenKhachHang,...resultRequest.body}};
        //     // else return {StatusCode: resultRequest.response.statusCode, json: resultRequest.body};

        //     break;
        // }
        case "GO":
        {
            const ts = moment().valueOf();
            const hashSecretKey = md5("Infymt");
            const reqBody = {
              "sender_account_number": payload.SourceAccountNumber.toString(), 
              "receiver_account_number": payload.DestinationAccountNumber.toString(), 
              "money": payload.Amount, 
              "type_fee": "1",   
              "message": payload.Message
              };

            const signature = MyBank_PrivateKeyObject.sign(reqBody,'base64');
            const sig = md5(ts + JSON.stringify(reqBody) + hashSecretKey);  

            let option = {
                method: 'POST',
                url: 'https://tts-bank.herokuapp.com/partner/recharge',
                headers: {
                    "partnerCode":"25Bank",
                    "ts": ts,
                    "sig": sig,
                    "signature": signature
                },
                json: reqBody
            };
            let resultRequest;
            try {
                resultRequest = await doRequest(option);
            } catch(err) {
                return {StatusCode:503, json:{"reply": "Dịch vụ của ngân hàng liên kết không sẵn có"}};
            }

            try {
                resultRequest.body = JSON.parse(resultRequest.body);
            } catch(err){
                //ignore
            }

            if (resultRequest.response.statusCode===203) return {StatusCode:200, json: {"reply": "Giao dịch chuyển khoản thành công"}};
            else return {StatusCode: resultRequest.response.statusCode, json: resultRequest.body};

            break;
        }
        case "37Bank":
        {
            let bankNumber = "370001";
            let requestId = bankNumber+moment().valueOf().toString().slice(4,-3);
            let amount = "20000";
            let message = "trả tiền chụp ảnhgggggggggggdfffffffffffffffffff";
            let rawMessage = bankNumber+requestId+amount+message;
            let signature = MyBank_PrivateKeyObject.sign(rawMessage,'base64');

            let option = {
                method: 'POST',
                url: 'https://ibanking37.herokuapp.com/v1/third-party/accounts/topup',
                headers: {"X-Third-Party-Name":"25Bank"}, 
                json: {
                    "bankNumber":bankNumber,
                    "requestId":requestId,
                    "amount": amount,
                    "message": message,
                    "signature": signature
                }
            };
            let resultRequest;
            try {
                resultRequest = await doRequest(option);
            } catch(err) {
                return {StatusCode:503, json:{"reply": "Dịch vụ của ngân hàng liên kết không sẵn có"}};
            }

            try {
                resultRequest.body = JSON.parse(resultRequest.body);
            } catch(err){
                //ignore
            }

            if (resultRequest.response.statusCode===200) return {StatusCode:200, json: {"reply": "Giao dịch chuyển khoản thành công"}};
            else return {StatusCode: resultRequest.response.statusCode, json: resultRequest.body};

            break;
        }
        default:
        {
            return {StatusCode: 406, json: {"reply":"Xin lỗi, không tìm thấy ngân hàng liên kết trong cơ sở dữ liệu"}};
            break;
        }
    }
};

function doRequest(option) {
    return new Promise(function (resolve, reject) {
        request(option, function (error, response, body) {
            if (error) {
                reject(error);
            }
            else {
                resolve({"response":response, "body":body});
            };
        });
    });
};