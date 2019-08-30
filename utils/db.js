const mysql = require('mysql');

const MYSOL_CONFIG = require('../config/mysql_config');

const pool = mysql.createPool(
    MYSOL_CONFIG.mysqlConfig
);

const dbExe = (sql, val) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                return reject(err);
            } else {
                connection.query(sql, val, (err, filed) => {
                    if (err) {
                        return reject(err);
                    } else {
                        resolve(filed);
                        connection.release();
                    }
                })
            }
        })
    });
};

module.exports = {
    dbExe
};