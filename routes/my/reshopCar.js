let express = require('express');
let router = express.Router();
let db = require('../../config/db');
const jwt = require("jsonwebtoken")
const tokenKey = require('../../config/token');

router.post("/", (req, res) => {
    const { token, name, ice, suger } = req.body;

    if (!token) return res.send({ message: '请携带 token 请求', code: 0 })
    jwt.verify(token, tokenKey.jwtSecretKey, (err, result) => {
        req.username = result.username
    })

    const sql = "delete from shopCar where username = ? and ice = ? and suger = ? and name = ?"
    const parsers = [req.username, ice, suger, name]

    db.query(sql, parsers, (results, fields) => {
        res.send({
            msg: "删除成功",
            code: 200
        })
    })
})

module.exports = router