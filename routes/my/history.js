let express = require('express');
let router = express.Router();
let db = require('../../config/db');
const jwt = require("jsonwebtoken")
const tokenKey = require('../../config/token');

router.post("/", (req, res) => {
    const { token, indexOne, indexTwo } = req.body;
    if (!token) return res.send({ message: '请携带 token 请求', code: 0 })
    jwt.verify(token, tokenKey.jwtSecretKey, (err, result) => {
        req.username = result.username
    })

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1，然后补齐两位数
    const day = String(now.getDate()).padStart(2, '0'); // 补齐两位数
    const hours = String(now.getHours()).padStart(2, '0'); // 补齐两位数
    const minutes = String(now.getMinutes()).padStart(2, '0'); // 补齐两位数
    const seconds = String(now.getSeconds()).padStart(2, '0'); // 补齐两位数

    const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const sql = "insert into history (username, indexOne, indexTwo, time) VALUES (?, ?, ?, ?)";
    const parsers = [req.username, indexOne, indexTwo, currentDateTime]

    db.query(sql, parsers, () => {
        res.send({
            msg: "添加成功",
            code: 200
        })
    })
})

module.exports = router