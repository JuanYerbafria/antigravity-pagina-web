const db = require('./db');

async function restoreDescriptions() {
    try {
        console.log('Restoring specific product descriptions...');

        // Mirage MR-166 Description
        const mirageDesc = `
Beneficios Destacados:

• Agarre en Mojado y Seco: Diseño de banda de rodadura optimizado para un excelente agarre en condiciones húmedas y secas, reduciendo el riesgo de aquaplaning.

• Durabilidad y Resistencia: Construcción reforzada para una mayor vida útil y resistencia al desgaste irregular.

• Conducción Silenciosa: Tecnología de reducción de ruido para un viaje más cómodo y silencioso.

• Estabilidad y Control: Diseño de hombros sólidos para una mejor respuesta en curvas y estabilidad a altas velocidades.
`.trim();

        // Tornel Selecta Plus Description
        const tornelDesc = `
Beneficios Destacados:

• Canales Direccionales Anchos: Diseñados para ofrecer mayor agarre en superficies mojadas y mejorar la tracción.

• Huella Más Ancha: Proporciona un mejor control del vehículo y estabilidad en la carretera.

• Diseño de Banda Optimizado: Secuencia de modulación para un manejo seguro y desgaste uniforme.

• Estructura Reforzada: Carcasa robusta de poliéster y cinturones de acero para una mayor durabilidad y resistencia a impactos.

• Compuesto Especial: Ayuda a una mejor disipación del calor, contribuyendo a una vida útil más larga.
`.trim();

        // Update Mirage (ID 1)
        await db.query("UPDATE products SET description = ? WHERE id = 1", [mirageDesc]);
        console.log('Updated Mirage MR-166 (ID 1)');

        // Update Tornel (ID 7)
        await db.query("UPDATE products SET description = ? WHERE id = 7", [tornelDesc]);
        console.log('Updated Tornel Selecta Plus (ID 7)');

        process.exit(0);
    } catch (error) {
        console.error('Error restoring descriptions:', error);
        process.exit(1);
    }
}

restoreDescriptions();
