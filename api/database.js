const mysql = require("mysql2");
require('dotenv').config();

module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'rico',
    password: process.env.DB_PASSWORD,
    database: 'holiday'
})