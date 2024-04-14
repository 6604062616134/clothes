const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost', // Change this to your MySQL host
    user: 'cream', // Change this to your MySQL username
    password: '27', // Change this to your MySQL password
    database: 'clothes', // Change this to your MySQL database
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;