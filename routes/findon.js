let express = require('express');
let router = express.Router();
let db = require('../config/db');


router.get('/', (req, res) => {
    const { appkey, pid } = req.query;

    const sql = 'SELECT * FROM allProudcr WHERE pid = ?';
    const params = [pid]

    db.query(sql, params, (results, fieds) => {
        if(appkey == 'sbhyz'){
            res.send({
                status: 200,
                msg: '查询成功',
                results: results
            })
        }
        else{
            res.send({
                status: 300,
                msg: '查询失败请检查appkey'
            })
        }
    })
})

module.exports = router