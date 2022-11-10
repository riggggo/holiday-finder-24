const mysql = require("mysql2");
const password = process.env.DB_PASSWORD;

let dbconnection = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    port: '3306',
    user: 'rico',
    password: password,
    database: 'holiday',
    
})//socketPath: '/var/run/mysqld/mysqld.sock'

dbconnection.on('connection', function (connection) {
    console.log('DB Connection established');
  
    connection.on('error', function (err) {
      console.error(new Date(), 'MySQL error', err.code);
    });
    connection.on('close', function (err) {
      console.error(new Date(), 'MySQL close', err);
    });
  
  });

module.exports = dbconnection;
  