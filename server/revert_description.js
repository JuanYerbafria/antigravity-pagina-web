const db = require('./db');

async function revertProductDescription() {
    try {
        console.log('Reverting product description for 4x3 items...');

        const genericDescription = "Llanta de alta calidad diseñada para ofrecer un excelente rendimiento y seguridad en el camino.";

        // Update products that have the specific "Beneficios Destacados" text
        const [result] = await db.query("UPDATE products SET description = ? WHERE description LIKE '%Beneficios Destacados%'", [genericDescription]);

        console.log(`Updated ${result.affectedRows} products to generic description.`);

        process.exit(0);
    } catch (error) {
        console.error('Error reverting description:', error);
        process.exit(1);
    }
}

revertProductDescription();
