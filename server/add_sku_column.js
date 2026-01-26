require('dotenv').config();
const mysql = require('mysql2/promise');

async function addSkuColumn() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('Database connected successfully');

        // Add SKU column to products table
        await connection.execute(`
            ALTER TABLE products 
            ADD COLUMN sku VARCHAR(50) NULL AFTER id
        `);
        console.log('SKU column added successfully');

        // Update existing products with sample SKUs
        const updates = [
            { id: 1, sku: 'LLT-MICH-P4-185' },
            { id: 2, sku: 'RIN-BMW-M4-18' },
            { id: 3, sku: 'AMO-DEL-HD-001' },
            { id: 4, sku: 'REF-PAST-BREM-F' }
        ];

        for (const update of updates) {
            await connection.execute(
                'UPDATE products SET sku = ? WHERE id = ?',
                [update.sku, update.id]
            );
        }

        console.log('Sample SKUs added to existing products');

        await connection.end();
        console.log('Done!');
    } catch (error) {
        console.error('Error:', error);
    }
}

addSkuColumn();
