let express = require('express');
let router = express.Router();
let db = require('../../config/db');


/* GET users listing. */
router.post('/', function(req, res) {
    const { username, password, newpasswrod } = req.body;

    const sql = 'SELECT * FROM login WHERE username = ?'
	  const params = [username]

    db.query(sql, params, (results, fields) => {
      const sqlChange = 'UPDATE login SET password=? WHERE username=?'
      const paramsChange = [newpasswrod, username]
      if(results.length == 0){
        res.send({ 
          status: 300,
          msg: '账号不存在' 
        })
      }else if(results.length != 0 && results[0].password == password){
        db.query(sqlChange, paramsChange, () => {
          res.send({ 
            status: 200,
            msg: '修改成功' 
          })
        })
      }
      else if (results.length != 0 && results[0].password != password){
        res.send({ 
          status: 400,
          msg: '原密码错误' 
        })
      }
    })


});

module.exports = router;