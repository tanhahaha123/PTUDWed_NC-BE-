const express = require('express');
const accountModel = require('../Models/accounts.model');


const router = express.Router();

router.get('/', async (req, res) => {
    const list = await accountModel.all();
    res.json(list);
});

router.get('/account/:stk', async (req, res) => {
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
        || req.body.SoTien== null || req.body.Phi ==null){
            return res.status(400).json({
                err: 'Null Error.'
                });
        }
    console.log('Here');
    // 1000 is phi
    const totalExchangeA = req.body.Phi ? (+req.body.SoTien) + 1000 : +req.body.SoTien;
    const totalExchangeB = req.body.Phi ? +req.body.SoTien : (+req.body.SoTien) - 1000;
    console.log(totalExchangeA + "");    
    var resultDetailA = await accountModel.detail(req.body.TKNguon);
    var resultDetailB = await accountModel.detail(req.body.TKDich);
    
    if(resultDetailA.length === 0){
        return res.status(400).json({
            err: 'Invalid A'
            });
    } else {
        if( totalExchangeA <= resultDetailA[0].SoDuHienTai){
            var exchangeA = await accountModel.exchangeA(req.body.TKNguon, totalExchangeA);
            var exchangeB = await accountModel.exchangeB(req.body.TKDich, totalExchangeB);
        }
    }

    const result = await accountModel.add(req.body);
    const ret = {
      id: result.insertID,
      ...req.body
    }

    res.status(201).json(ret);
})


module.exports=router;