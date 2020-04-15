const mysql = require('mysql');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'lianeddy',
    password : 'asd123',
    database : 'todo_app',
    port : 3306
});

// const query = util.promisify(db.query).bind(db);
module.exports = db;