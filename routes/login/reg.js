let express = require('express');
let router = express.Router();
let db = require('../../config/db');

router.use(express.json());

router.post('/', (req, res) => {
    const { username, password } = req.body;

    const sqlSelect = "SELECT * FROM login";
    db.query(sqlSelect, [], (results, fields) => {
        const all = results;

        for (let i = 0; i < all.length; i++) {
            if (all[i].username === username) {
                return res.status(300).json({ 
                    message: '账号已存在',
                    status: 300
                 });
            }
        }

        const sqlInsert = "INSERT INTO login (id, username, password) VALUES (?, ?, ?)";
        const params = [all.length + 1, username, password];
        db.query(sqlInsert, params, (results, fields) => {
            if (results && results.affectedRows === 1) {
                res.status(200).json({ 
                    message: '用户注册成功',
                    status: 200
                 });
            } else {
                res.status(500).json({ 
                    message: '注册失败',
                    status: 500
                 });
            }
        });
    });
});

module.exports = router;
