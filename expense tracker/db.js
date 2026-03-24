const mysql = require('mysql2');

// Use connection pool (better than single connection)
const db = mysql.createPool({
    host: process.env.DB_HOST || 'dpg-d71e3414tr6s73am7r00-a',
    user: process.env.DB_USER || 'expense_db_vacb_user',
    password: process.env.DB_PASSWORD || '55hFvAF25nqsIprYmitLP9vmKAaMQqkB',
    database: process.env.DB_NAME || ' expense_db_vacb ',
    port: process.env.DB_PORT || '5432',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection
db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
    } else {
        console.log("✅ MySQL Connected...");
        connection.release();
    }
});

module.exports = db;
