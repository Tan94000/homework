let express = require('express');
let router = express.Router();
let db = require('../../config/db');
const jwt = require("jsonwebtoken")
const tokenKey = require('../../config/token');


router.post('/', (req, res) => {
    const { token, name, introduce, tel} = req.body;

    if (!token) return res.send({ message: '请携带 token 请求', code: 0 })
    jwt.verify(token, tokenKey.jwtSecretKey, (err, result) => {
        req.username = result.username
    })

    const sql = `UPDATE information SET name = ?, tel = ?, introduce = ? WHERE username = ?`;

    const params = [name, tel, introduce, req.username]

    db.query(sql, params, (results, fields) => {
        res.send({
            status: 200,
            msg: '修改成功'
        })
    })

})

module.exports = router