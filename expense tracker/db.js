const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rudr42464%',  // your MySQL password
    database: 'expense_db'
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

module.exports = db;