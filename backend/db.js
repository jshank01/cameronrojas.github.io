// db.js - Database Connection with Detailed Logging

require('dotenv').config();
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true // Attempt SSL connection
    }
});

// Test the database connection
db.getConnection()
    .then(() => console.log("Database connected successfully"))
    .catch(error => {
        console.error("Database connection error:", error); // Log detailed error
        if (error.code === 'ER_SECURE_TRANSPORT_REQUIRED') {
            console.log("SSL connection required by server. Check SSL configuration.");
        }
    });

module.exports = db;
