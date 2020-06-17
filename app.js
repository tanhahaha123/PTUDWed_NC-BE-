const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('express-async-errors');

const config = require('./Config/config.json');

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

//----------------------AUTHENTICATION--------------------------------
//--------------------------------------------------------------------
app.use('/api/auth', require('./Routes/Authentication/SignIn.route'));

function verify(req, res, next) {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'secretKey', function (err, payload) {
      if (err)
        throw createError(401, err);

      req.tokenPayload = payload;
      next();
    })
  } else {
    throw createError(401, 'No accessToken found.');
  }
};

app.use('/api/internal/debt-reminder', require('./Routes/DebtReminder.route'));

//----------------------PARTNER--------------------------------
//cho phép ngân hàng đã liên kết truy cập vào tài nguyên này
app.use('/api/partner/account-bank', require('./Routes/Partner_AccountBank.route'));

//----------------------EXTERNAL--------------------------------
//gọi tài nguyên API tới ngân hàng khác
// app.use('/api/external/account-bank', require('./Routes/External_AccountBank.route'));

//----------------------INTERNAL--------------------------------
//các tài nguyên API nội bộ nằm ở đây
app.use('/api/internal/accountbank', require('./Routes/AccountBank.route'));
app.use('/api/internal/accountuser', require('./Routes/AccountUser.route'));
app.use('/api/internal/paymentaccount', require('./Routes/PaymentAccount.route'));
app.use('/api/internal/savingaccount', require('./Routes/SavingAccount.rotue'));
app.use('/api/internal/transaction', require('./Routes/TransactionHistory.route'));
// app.use('/login', require('./Routes/login.route'));
// app.use('/logout', require('./Routes/logout.route'));
app.use('/api/forgot-password', require('./Routes/ForgotPassword.route'));
app.use('/api/internal/account-customer', require('./Routes/Internal_AccountCustomer.route'));
app.use('/api/internal/account-bank', require('./Routes/Internal_AccountBank.route'));


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