let express = require('express');
let router = express.Router();
let db = require('../../config/db');

router.get('/', (req, res) => {
    let appkey = req.query.appkey;
    
    const sql = 'SELECT * FROM allProudcr';

    db.query(sql, [], (results, fields) => {
        if(appkey == "sbhyz"){
            
            for (var i in results){
                var key = Object.keys(results[i])
                for(var j in key){
                    var string = JSON.stringify(results[i][key[j]])
                    if(string != "null"){
                        string = string.split(/\\\\/)
                        // var data = {}
                        // data[string[0]] = string
                        // results[i][key[j]] = JSON.stringify(data)
                        // console.log(JSON.stringify(data))
                        if(string.length != 1){
                            results[i][key[j]] = string
                        }
                    } 
                    // console.log(results[i][key[j]])
                }
            }


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