let express = require('express');
let router = express.Router();
let db = require('../../config/db');
const jwt = require("jsonwebtoken")
const tokenKey = require('../../config/token');

router.post("/", (req, res) => {
    let { token, name, img, indexOne, indexTwo, suger, ice, number } = req.body;

    if (!token) return res.send({ message: '请携带 token 请求', code: 0 })
    jwt.verify(token, tokenKey.jwtSecretKey, (err, result) => {
        req.username = result.username
    })


    const sql = "SELECT * from shopCar where username = ?"

    db.query(sql, [req.username], (results, fields) => {
        let status = false //true修改 false增加 
        // console.log(results)
        // res.send({res: results})
        results.forEach(item => {
            if (item.name === name && item.suger === suger && item.ice === ice) {
                // parseInt(number) += parseInt(item.number)
                number = `${parseInt(number) + parseInt(item.number)}`
                status = !status
            }
            // console.log(item)
        });

        if (!status) {
            const newparams = [req.username, name, img, indexOne, indexTwo, suger, ice, number]
            const newsql = "insert into shopCar (username, name, img, indexOne, indexTwo, suger, ice, number) VALUES (?,?,?,?,?,?,?,?)"
            db.query(newsql, newparams, (results, fields) => {
                res.send({
                    msg: "添加成功",
                    code: 200
                })
            })
        }
        else {
            const newsql = "update shopCar set number = ? where username = ? and name = ?"
            const newparams = [number, req.username, name]
            db.query(newsql, newparams, (results, fields) => {
                res.send({
                    msg: "添加成功",
                    code: 200
                })
            })
        }
    })
})

module.exports = router