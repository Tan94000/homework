let express = require('express');
let router = express.Router();
let db = require('../config/db');
const jwt = require("jsonwebtoken")
const tokenKey = require('../config/token');

/* GET users listing. */
router.get('/', function(req, res, next) {
    const { username, password } = req.query;

    const sql = 'SELECT * FROM login WHERE username = ?'
	const params = [username]

	if(!username || !password){
		return
	}
	

	
	db.query(sql, params, (results, fields) => {
		if(results.length == 0){
			res.send({ 
				status: 300,
				msg: '账号不存在' 
			})
		}
		else if(results.length != 0 && results[0].password == password){
			let user = {username, password}
			const token = jwt.sign(user, tokenKey.jwtSecretKey, {expiresIn: tokenKey.expiresIn})
			res.send({
				status: 200,
				msg: '登录成功',
				token: token
			})
		}
		else if(results.length != 0 && results[0].password != password){
			res.send({ 
				status: 300,
				msg: '密码错误'
			})
		}
	})

});


module.exports = router;