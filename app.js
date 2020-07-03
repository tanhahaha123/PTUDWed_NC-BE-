const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors');


const config = require('./Config/config.json');
const { verify } =require('./Middlewares/Verify');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    msg: 'hello from banking api'
  });
})

app.get('/apidoc',(req,res)=>{
	res.redirect('https://team25apidoc.000webhostapp.com/');
});

//------------------------ADMINISTRATOR--------------------------------


app.use('/api/admin', require('./Routes/Admin/EmployeeManagement.route'));
app.use('/api/admin/transaction', require('./Routes/Admin/Transaction.route'));

//------------------------AUTHENTICATION--------------------------------

app.use('/api/auth/signin',  require('./Routes/Authentication/SignIn.route'));
app.use('/api/auth/signup', require('./Routes/Authentication/SignUp.route'));
app.use('/api/auth/change-password', verify, require('./Routes/Authentication/ChangePassword.route'));

app.use('/api/auth/refresh-token', require('./Routes/Authentication/RefreshToken.route'));

app.use('/api/internal/debt-reminder', verify,  require('./Routes/DebtReminder.route'));

//----------------------PARTNER--------------------------------
//cho phép ngân hàng đã liên kết truy cập vào tài nguyên này
app.use('/api/partner/account-bank',verify, require('./Routes/Partner_AccountBank.route'));

//----------------------EXTERNAL--------------------------------
//gọi tài nguyên API tới ngân hàng khác
// app.use('/api/external/account-bank', require('./Routes/External_AccountBank.route'));

//----------------------INTERNAL--------------------------------
//các tài nguyên API nội bộ nằm ở đây
app.use('/api/internal/accountbank', verify, require('./Routes/AccountBank.route'));
app.use('/api/internal/accountuser',verify, require('./Routes/AccountUser.route'));
app.use('/api/internal/paymentaccount',verify, require('./Routes/PaymentAccount.route'));
app.use('/api/internal/savingaccount',verify, require('./Routes/SavingAccount.rotue'));
app.use('/api/internal/transaction', verify, require('./Routes/TransactionHistory.route'));
// app.use('/login', require('./Routes/login.route'));
// app.use('/logout', require('./Routes/logout.route'));
app.use('/api/forgot-password', require('./Routes/ForgotPassword.route'));
app.use('/api/internal/account-customer',verify, require('./Routes/Internal_AccountCustomer.route'));
app.use('/api/internal/account-bank',verify, require('./Routes/Internal_AccountBank.route'));


app.use((req, res, next) => {
  res.status(404).send('NOT FOUND');
})

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send('View error log on console.');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, _ => {
  console.log(`API is running at http://localhost:${PORT}`);
})