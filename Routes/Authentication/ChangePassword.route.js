const express = require('express');
const changePasswordModel = require('../../Models/Authentication/SignIn.model');

const router = express.Router();

router.post('/', async (req, res) => {
  const result = await changePasswordModel.changePassword(req.body);
  const ret = {
    id: true
  }
  res.status(201).json(ret);
});

module.exports = router;