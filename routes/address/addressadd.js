let express = require('express');
let router = express.Router();
let db = require('../../config/db');
const jwt = require("jsonwebtoken")
const tokenKey = require('../../config/token');


router.post('/', (req, res) => {
    const { token, name, tel, province, city, county, minute, df } = req.body;
    
    if (!token) return res.send({ message: '请携带 token 请求', code: 0 })
    jwt.verify(token, tokenKey.jwtSecretKey, (err, result) => {
        req.username = result.username
    })

    // res.send(req.username)

    
    const sql = 'SELECT * FROM address WHERE username = ?';

    db.query(sql, [req.username], (results, fields) => {
        let sid = `sid${results.length + 1}`
        // console.log(sid)

        const sqlAdd = 'INSERT INTO address (addressSid, name, tel, province, city, county, minute, df, username) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        const params = [sid, name, tel, province, city, county, minute, Number(df), req.username]

        db.query(sqlAdd, params, (results, fields) => {
            res.send({
                status: 200,
                msg: '添加成功'
            })
        })
    })
})

module.exports = router