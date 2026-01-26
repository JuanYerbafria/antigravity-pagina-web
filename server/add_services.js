const db = require('./db');

const services = [
    {
        name: 'Vulcanizadora',
        description: 'Reparación profesional de pinchaduras y daños en tus llantas.'
    },
    {
        name: 'Vulcanizadora Movil',
        description: 'Servicio de vulcanizadora hasta donde te encuentres.'
    },
    {
        name: 'Reparacion de Rin',
        description: 'Enderezado, soldadura y pintura de rines de aluminio y acero.'
    },
    {
        name: 'Llenado de Nitrogeno',
        description: 'Mejora el rendimiento y la vida útil de tus llantas con nitrógeno.'
    }
];

async function addServices() {
    try {
        console.log('Starting to add services...');

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
