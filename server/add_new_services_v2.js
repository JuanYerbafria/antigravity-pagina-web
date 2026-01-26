const db = require('./db');

const services = [
    {
        name: 'Seccionado de llanta',
        description: 'Reparación especializada y reforzamiento de daños estructurales en tus llantas.'
    },
    {
        name: 'Escaneo',
        description: 'Diagnóstico computarizado completo para identificar y solucionar fallas en el sistema electrónico.'
    },
    {
        name: 'Frenos',
        description: 'Mantenimiento, reparación y cambio de balatas para garantizar tu seguridad.'
    }
];

async function addServices() {
    try {
        console.log('Starting to add new services...');

        for (const service of services) {
            // Check if service exists
            const [existing] = await db.query('SELECT * FROM services WHERE name = ?', [service.name]);

            if (existing.length === 0) {
                await db.query('INSERT INTO services (name, description) VALUES (?, ?)', [service.name, service.description]);
                console.log(`Added service: ${service.name}`);
            } else {
                console.log(`Service already exists: ${service.name}`);
            }
        }

        console.log('Finished adding services.');
        process.exit(0);
    } catch (error) {
        console.error('Error adding services:', error);
        process.exit(1);
    }
}

addServices();
