let express = require('express');
let router = express.Router();
let db = require('../../config/db');
const jwt = require("jsonwebtoken")
const tokenKey = require('../../config/token');


router.post('/', (req, res) => {
    const { token, name, tel, province, city, county, minute } = req.body;
    let df = req.body
    
    if (!token) return res.send({ message: '请携带 token 请求', code: 0 })
    jwt.verify(token, tokenKey.jwtSecretKey, (err, result) => {
        req.username = result.username
    })

    if (!df || isNaN(df)) {
        df = 0; // 如果 df 不是有效数字，将其设置为默认值 0
      } else {
        df = Number(df); // 将 df 转换为数字类型
      }

    // res.send(req.username)

    
    const sql = 'SELECT * FROM address WHERE username = ?';

    db.query(sql, [req.username], (results, fields) => {
        let sid = 1
        if("addressSid" in results) sid = `${Number(results[results.length - 1]["addressSid"]) + 1}`

        const sqlAdd = 'INSERT INTO address (addressSid, name, tel, province, city, county, minute, df, username) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        const params = [sid, name, tel, province, city, county, minute, df, req.username]

        db.query(sqlAdd, params, (results, fields) => {
            res.send({
                status: 200,
                msg: '添加成功'
            })
        })
    })
})

module.exports = router