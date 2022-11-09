const mysql = require("mysql2");
const password = process.env.DB_PASSWORD;

module.exports = mysql.createConnection({
    connectionLimit: 10,
    host: '127.0.0.1',
    port: '3306',
    user: 'rico',
    password: password,
    database: 'holiday',
    
})//socketPath: '/var/run/mysqld/mysqld.sock'
