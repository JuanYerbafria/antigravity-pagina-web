const db = require('./db');

async function updateSchema() {
    try {
        console.log('Updating products category ENUM...');
        // Note: Adding 'Materiales' and 'Accesorios' to the list
        await db.query(`
            ALTER TABLE products 
            MODIFY COLUMN category ENUM('Llantas', 'Rines', 'Baterias', 'Refacciones', 'Materiales', 'Accesorios', 'Otros')
        `);
        console.log('Successfully updated category ENUM.');
        process.exit(0);
    } catch (error) {
        console.error('Error updating schema:', error);
        process.exit(1);
    }
}

updateSchema();
