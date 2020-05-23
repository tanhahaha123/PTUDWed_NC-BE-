const express = require('express');
const accountModel = require('../Models/accounts.model');


const router = express.Router();

// Truy van thong tin tat ca tai khoan
router.get('/', async (req, res) => {
    //Lay tat ca tai khoan thanh toan
    const listTKTT = await accountModel.allTKTT();
    //Lay tat ca tai khoan tiet kiem
    const listTKTK = await accountModel.allTKTK();
    res.json(Object.assign(listTKTT, listTKTK));
});


//Truy van thong tin 1 tai khoan
//Nhap vao so tai khoan
router.get('/detail/:stk', async (req, res) => {
    //Kiem tra tinh hop le
    if (isNaN(req.params.stk)) {
        return res.status(400).json({
          err: 'Invalid STK.'
        });
      }
    const stk = +req.params.stk || 0;
    const listTKTT = await accountModel.detailTKTT(stk);
    const listTKTK = await accountModel.detailTKTK(stk);
    //Kiem tra query rong
    if( listTKTK.length==0 && listTKTT.length==0)
    {
        res.status(404).json({err:"Khong tim thay du lieu."});
    }
    const ret={
        ...listTKTT[0],
        ...listTKTK[0]
    }
    res.json(ret);
});


// Nop tien vao tai khoan, khong co SoTaiKhoanNguoiGoi
router.post('/exchange/admin', async (req, res) => {

    //Kiem tra co khac ngan hang k
    if(req.body.TenNganHang != ""){
        //Kiem tra ten ngan hang co trong danh sach ngan hang lien ket k
        const NganHangLienKet = req.body.TenNganHang || "";
        const listNganHangLienKet = await accountModel.getNganHangLienKet(NganHangLienKet);
        console.log(listNganHangLienKet[0]);
        if(listNganHangLienKet.length == 0){
            return res.status(400).json({
                err: 'Ngan hang chua duoc lien ket.'
            });
        }
    }
    //Kiem tra SoTaiKhoanGiaoDich, So Tien, NgayGiaoDich isNAN
    if( isNaN(req.body.SoTaiKhoanGiaoDich)|| isNaN(req.body.SoTien)){
        return res.status(400).json({
            err: 'Invalid Error.'
        });
    }
    //Check null or const
    if (req.body.SoTaiKhoanGiaoDich == "" || req.body.SoTien == "" || req.body.NgayGiaoDich == "" ){
        return res.status(400).json({
            err: 'Null Error.'
            });
    }

    var resultDetailB = await accountModel.detailTKTT(req.body.SoTaiKhoanGiaoDich);
    if(resultDetailB.length == 0){
        return res.status(400).json({
            err: 'Khong tim thay so tai khoan giao dich.'
            });
    }

    // Neu tat ca deu dung, nop tien vao tai khoan B. 
    var exchangeB = await accountModel.exchangeB(req.body.SoTaiKhoanGiaoDich, req.body.SoTien);
    // cap nhat lich su giao dich
    var updateHistory = await accountModel.updateHistory(req.body);
    const ret={
        "Success": true
    }
    res.json(ret);
});

//Giao dich giua A va B
// router.post('/exchange', async (req, res) => {
//     var isEmployee = false;
//     //Kiem tra co cung ngan hang k //TenNganHang == null
//     if(req.body.TenNganHang == ""){
//         //Kiem tra xem co phai la nap tien k //SoTaiKhoanNguoiGui == null
//         if(req.body.SoTaiKhoanNguoiGui){
//             console.log("here-4");
//             isEmployee= true;
//         }else{
//         }
//     }else{
//         //Kiem tra ten ngan hang co trong danh sach ngan hang lien ket k
//         console.log("here-3");
//         console.log(req.body.TenNganHang);
//         const NganHangLienKet = req.body.TenNganHang || "";
//         const listNganHangLienKet = await accountModel.getNganHangLienKet(NganHangLienKet);
//         console.log(listNganHangLienKet[0]);
//         if(listNganHangLienKet.length == 0){
//             return res.status(400).json({
//                 err: 'Ngan hang chua duoc lien ket.'
//             });
//         }
//     }

//     //Check isNotANumber
//     if( isNaN(req.body.SoTaiKhoanGiaoDich)|| isNaN(req.body.SoTien)){
//         return res.status(400).json({
//             err: 'Invalid Error.'
//             });
//     }
//     //Check null or const
//     if ( req.body.SoTaiKhoanGiaoDich == null || req.body.SoTien == null || req.body.NgayGiaoDich == null ){
//             return res.status(400).json({
//                 err: 'Null Error.'
//                 });
//     }

//     var resultDetailA = await accountModel.detailTKTT(req.body.SoTaiKhoanNguoiGui||0);
//     var resultDetailB = await accountModel.detailTKTT(req.body.SoTaiKhoanGiaoDich);

//     //Gia tri tra ve;
//     var ret;

//     if((resultDetailA.length === 0 && !isEmployee) || resultDetailB.length === 0){
//         //Truong hop khong phai nhan vien ma khong co SoTaiKhoanNguoiGui
//         // or SoTaiKhoanGiaoDich ==0
//         return res.status(400).json({
//             err: 'Invalid A'
//             });
//     } else {
//         //Khong phai nhan vien
//         if(!isEmployee){
//             const totalExchangeA = (+req.body.SoTien) + 1000;
//             if(((+req.body.SoTien) + 1000) <= resultDetailA[0].SoDu){ 
//                 //Cap nhat so_du cho nguoi goi va nguoi nhan
//                 var exchangeA = await accountModel.exchangeA(req.body.SoTaiKhoanNguoiGui, totalExchangeA);
//                 var exchangeB = await accountModel.exchangeB(req.body.SoTaiKhoanGiaoDich, req.body.SoTien);
//             }else {
//                 //Khong du tien
//                 return res.status(400).json({
//                     isEnough: false
//                 });
//             }
//         }else{
//             // La nhan vien
//             // Cap nhat so tien them vao vi
//                 var exchangeB = await accountModel.exchangeB(req.body.TKDich, req.body.SoTien);
//         }
//     }
//     ret = {
//         success:true
//     }
//     res.status(201).json(ret);
// });

module.exports=router;