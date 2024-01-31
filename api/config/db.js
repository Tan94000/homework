let mysql = require('mysql');
let dbConfig = require('./db.config');

let pool = mysql.createPool(dbConfig);

module.exports = {
    query: function (sql, params, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.error('Error getting connection from pool: ' + err.stack);
                return callback(err, null);
            }
            connection.query(sql, params, function (err, results, fields) {
                connection.release(); // 释放连接回连接池
                if (err) {
                    console.error('Error executing query: ' + err.stack);
                    return callback(err, null);
                }
                callback && callback(results, fields);
            });
        });
    }
};
