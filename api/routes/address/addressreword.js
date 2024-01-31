let express = require('express');
let router = express.Router();
let db = require('../../config/db');
const jwt = require("jsonwebtoken")
const tokenKey = require('../../config/token');


router.post('/', (req, res) => {
    const { token, name, tel, province, city, county, minute, sid } = req.body;
    let df = req.body

    if (!token) return res.send({ message: '请携带 token 请求', code: 0 })
    jwt.verify(token, tokenKey.jwtSecretKey, (err, result) => {
        req.username = result.username
    })

    if (!sid) return res.send({ message: '请携带 sid 请求', code: 0 })

    if (!df || isNaN(df)) {
        df = 0; // 如果 df 不是有效数字，将其设置为默认值 0
      } else {
        df = Number(df); // 将 df 转换为数字类型
      }

    // res.send(req.username)

    const sql = `UPDATE address SET name = ?, tel = ?, province = ?, city = ?, county = ?, minute = ?, df = ?
     WHERE addressSid = ? and username = ?`;

    const params = [name, tel, province, city, county, minute, df, sid, req.username]

    db.query(sql, params, (results, fields) => {
        res.send({
            status: 200,
            msg: '修改成功'
        })
    })

})

module.exports = router