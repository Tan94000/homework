let express = require('express');
let router = express.Router();
let db = require('../../config/db');
const jwt = require("jsonwebtoken")
const tokenKey = require('../../config/token');


router.get('/', (req, res) => {
    const { appkey, token, sid } = req.query;
    
    if (!token) return res.send({ message: '请携带 token 请求', code: 0 })
    jwt.verify(token, tokenKey.jwtSecretKey, (err, result) => {
        req.username = result.username
    })

    if (!sid) return res.send({ message: '请携带 sid 请求', code: 0 })

    // res.send(req.username)

    
    const sql = 'SELECT * FROM address WHERE username = ? and addressSid = ?';

    db.query(sql, [req.username, sid], (results, fields) => {
        if(appkey == "sbhyz"){
            res.send({
                status: 200,
                msg: "查询成功",
                results: results
            })
        }
        else{
            res.send({
                status: 400,
                msg: '查询失败'
            })
        }
    })
})

module.exports = router