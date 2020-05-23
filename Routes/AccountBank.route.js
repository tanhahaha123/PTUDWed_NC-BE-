const express = require('express');
const accountModel = require('../Models/AccountBank.model');


const router = express.Router();

// Lay tat ca thong tin cua cac tai khoan
router.get('/', async (req, res) => {
    const list = await accountModel.all();
    res.json(list);
});

//Chi tiet thong tin 1 tai khoan
//Khong hien thi so du
router.get('/detail/:stk', async (req, res) => {
    //Kiem tra tinh hop le
    if (isNaN(req.params.stk)) {
        return res.status(400).json({
          err: 'Invalid STK.'
        });
      }

    const stk = +req.params.stk || 0;
    const list = await accountModel.detail(stk);
    const ret={
        ...list[0]
    }
    delete ret.SoDuHienTai;
    res.json(ret);
});

//Giao dich giua A va B
router.post('/exchange', async (req, res) => {
    //Check isNumber
    if( isNaN(req.body.TKNguon)|| isNaN(req.body.TKDich)|| 
        isNaN(req.body.SoTien)){
        return res.status(400).json({
            err: 'Invalid Error.'
            });
    }
    //Check null or const
    if ( req.body.TKNguon == null || req.body.TKDich == null 
        || req.body.SoTien== null || req.body.PhiAChiu ==null){
            return res.status(400).json({
                err: 'Null Error.'
                });
        }

    // Tong chi phi = SoTienGui + Phi
    const totalExchangeA = req.body.PhiAChiu ? (+req.body.SoTien) + 1000 : +req.body.SoTien;
    const totalExchangeB = req.body.PhiAChiu ? +req.body.SoTien : (+req.body.SoTien) - 1000;

    var resultDetailA = await accountModel.detail(req.body.TKNguon);
    var resultDetailB = await accountModel.detail(req.body.TKDich);

    //Gia tri tra ve sau toan bo func
    var ret;
    
    if(resultDetailA.length === 0 || resultDetailB.length === 0){
        return res.status(400).json({
            err: 'Invalid A'
            });
    } else {
        if( totalExchangeA <= resultDetailA[0].so_du){ 
            //
            ret={
                SoDuNguoiGuiTrc: resultDetailA[0].so_du,
                SoDuNguoiNhanTrc: resultDetailB[0].so_du
            }
            //Cap nhat so_du cho nguoi goi va nguoi nhan
            var exchangeA = await accountModel.exchangeA(req.body.TKNguon, totalExchangeA);
            var exchangeB = await accountModel.exchangeB(req.body.TKDich, totalExchangeB);
            

        }else {
            return res.status(400).json({
                isEnough: false
                });
        }
    }

    const resultA = await accountModel.detail(req.body.TKNguon);
    const resultB = await accountModel.detail(req.body.TKDich);
    ret = {
        ...ret,
        SoDuNguoiGoiSau: resultA[0].so_du,
        SoDuNguoiNhanSau: resultB[0].so_du
    }

    res.status(201).json(ret);
});


module.exports=router;