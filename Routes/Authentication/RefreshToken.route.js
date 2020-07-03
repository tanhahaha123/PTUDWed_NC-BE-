const express = require('express');
const jwt = require('jsonwebtoken');

const config = require('../../Config/config.json');
const RefreshTokenModel = require('../../Models/Authentication/RefreshToken.model');

const router = express.Router();

router.get('/', async (req, res) => {
	let payload = req.body;
	// payload = {
    //     "AccessToken":"sdfadfdfsfd",
    //     "RefreshToken":"dfadfadghadf"
    // }

    if (payload.AccessToken == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường AccessToken, sai định dạng hoặc đang bỏ trống'
        });
    }
    if (payload.RefreshToken == null) {
        return res.status(400).json({
            err: 'Vui lòng kiểm tra lại trường RefreshToken, sai định dạng hoặc đang bỏ trống'
        });
    }

    let decoded = jwt.decode(payload.AccessToken);
    if ((decoded)&&(decoded.userId)) {
        jwt.verify(payload.RefreshToken, config.AUTH.refreshKey, async function(err, decoded) {
          if (err) return res.status(400).json(err);
          let resultGetRefreshToken = await RefreshTokenModel.getRefreshToken(decoded.userId,payload.RefreshToken);
          if (resultGetRefreshToken.length > 0) {
            let AccessToken = jwt.sign({"userId":decoded.userId}, config.AUTH.secretKey, {expiresIn: config.AUTH.secretTokenLife});
            return res.json({ //dù sai vẫn thông báo
                "AccessToken": AccessToken
            });
          }
          else 
          {
            return res.status(400).json({
                err: 'RefreshToken không tồn tại'
            });
          }
        });
    }
    else 
    {
        return res.status(400).json({
            err: 'Truyền AccessToken sai'
        });
    }
});

module.exports=router;