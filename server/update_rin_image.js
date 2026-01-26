require('dotenv').config();
const mysql = require('mysql2/promise');

async function updateRinImage() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('Database connected successfully');

        // Update the Rines product with the new image
        const [result] = await connection.execute(
            `UPDATE products 
             SET image_url = '/images/productos/RIN0142.png' 
             WHERE category = 'Rines' 
             LIMIT 1`
        );

        console.log(`Updated ${result.affectedRows} product(s) with the rin image`);

        await connection.end();
    } catch (error) {
        console.error('Error updating rin image:', error);
    }
}

updateRinImage();
