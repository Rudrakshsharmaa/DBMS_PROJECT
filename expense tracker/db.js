const mysql = require('mysql2');

// Use connection pool (better than single connection)
const db = mysql.createPool({
    host: process.env.DB_HOST || 'your-host',
    user: process.env.DB_USER || 'your-user',
    password: process.env.DB_PASSWORD || 'your-password',
    database: process.env.DB_NAME || 'your-database',
    port: process.env.DB_PORT || 3306,
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
