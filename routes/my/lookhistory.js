let express = require('express');
let router = express.Router();
let db = require('../../config/db');
const jwt = require("jsonwebtoken")
const tokenKey = require('../../config/token');

router.get("/", (req, res) => {
    const { token } = req.query;

    if (!token) return res.send({ message: '请携带 token 请求', code: 0 })
    jwt.verify(token, tokenKey.jwtSecretKey, (err, result) => {
        req.username = result.username
    })

    const sql = "SELECT * from history where username = ?"
    db.query(sql, [req.username], (results, fields) => {
        res.send({
            msg: "查询成功",
            code: 200,
            results: results
        })
    })
})

module.exports = router