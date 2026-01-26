const db = require('./db');

async function addPromotionColumn() {
    try {
        console.log('Checking for promocion column...');

        // Check if column exists
        const [rows] = await db.query("SHOW COLUMNS FROM products LIKE 'promocion'");

        if (rows.length === 0) {
            console.log('Adding promocion column...');
            await db.query("ALTER TABLE products ADD COLUMN promocion VARCHAR(20) DEFAULT NULL");
            console.log('Column added successfully.');
        } else {
            console.log('Column already exists.');
        }

        // Set a sample product to have 4x3 promotion for testing
        // Update the first tire (Llantas) found
        console.log('Setting sample 4x3 promotion on a tire...');
        await db.query("UPDATE products SET promocion = '4x3' WHERE category = 'Llantas' LIMIT 1");

        process.exit(0);
    } catch (error) {
        console.error('Error adding column:', error);
        process.exit(1);
    }
}

addPromotionColumn();
