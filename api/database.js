const mysql = require("mysql2");
require('dotenv').config();

module.exports = mysql.createConnection({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'rico',
    port: '3306',
    password: process.env.DB_PASSWORD,
    database: 'holiday',
    socketPath: '/var/run/mysqld/mysqld.sock'
})