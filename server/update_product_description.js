const db = require('./db');

async function updateProductDescription() {
    try {
        console.log('Updating product description...');

        // Sample description formatted as the user requested
        // Using "Beneficios Destacados:" as a section header
        // And bullets with "Title: Description" format
        const newDescription = `
Beneficios Destacados:

• Durabilidad y Resistencia: Las llantas Tornel en general se caracterizan por su durabilidad y resistencia al desgaste, ofreciendo un rendimiento confiable.

• Agarre y Tracción: Proporciona un buen agarre y tracción para una conducción segura tanto en ciudad como en carretera.

• Rendimiento Equilibrado: Ofrece un rendimiento equilibrado, siendo una opción confiable y económica para conductores que buscan seguridad y eficiencia.
`.trim();

        // Update the same product that has the 4x3 promotion
        const [result] = await db.query("UPDATE products SET description = ? WHERE promocion = '4x3' LIMIT 1", [newDescription]);

        if (result.affectedRows > 0) {
            console.log('Product description updated successfully.');
        } else {
            console.log('No product found with 4x3 promotion to update.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error updating description:', error);
        process.exit(1);
    }
}

updateProductDescription();
