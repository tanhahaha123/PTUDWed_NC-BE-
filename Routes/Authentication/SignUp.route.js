const express = require('express');
const signUpModel = require('../../Models/Authentication/SignUp.model');

const router = express.Router();

router.post('/', async (req, res) => {
  const result = await signUpModel.add(req.body);
  const ret = {
    id: result.insertId,
    ...req.body
  }

  delete ret.MatKhau;
  res.status(201).json(ret);
});

module.exports = router;