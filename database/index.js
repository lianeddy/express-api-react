const mysql = require('mysql');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'lianeddy',
    password : 'asd123',
    database : 'todo_app',
    port : 3306
});

module.exports = db;