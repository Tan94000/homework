let express = require('express');
let router = express.Router();
let db = require('../config/db');

router.get('/', (req, res) => {
    let appkey = req.query.appkey;
    
    const sql = 'SELECT * FROM allProudcr';

    db.query(sql, [], (results, fields) => {
        if(appkey == "sbhyz"){
            res.send({
                status: 200,
                msg: "查询成功",
                results: results
            })
        }
        else{
            res.send({
                status: 300,
                msg: '查询失败'
            })
        }
    })
})

module.exports = router