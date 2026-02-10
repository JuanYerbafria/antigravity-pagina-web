const mysql = require('mysql2/promise');
require('dotenv').config();

async function testDb() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('Connected to MySQL!');
        const [rows] = await connection.query('SHOW TABLES');
        const tables = rows.map(row => Object.values(row)[0]);
        console.log('Tables found:', tables.join(', '));
        await connection.end();
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

testDb();
