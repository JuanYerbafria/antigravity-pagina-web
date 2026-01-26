const db = require('./db');

const schedules = {
    'Corregidora': 'Lunes-Viernes: 8:00 - 18:30\nSábado: 8:30 - 16:30\nDomingo: Cerrado',
    'Pradera': 'Lunes-Viernes: 8:00 - 20:00\nSábado: 8:30 - 16:30\nDomingo: 9:00 - 17:00',
    'Plateros': 'Lunes-Viernes: 8:30 - 19:00\nSábado: 8:30 - 16:30\nDomingo: Cerrado',
    'Av del Parque': 'Lunes-Viernes: 8:00 - 18:30\nSábado: 8:30 - 16:30\nDomingo: 9:00 - 17:00',
    'Miranda': 'Lunes-Viernes: 8:30 - 18:30\nSábado: 8:30 - 16:30\nDomingo: Cerrado',
    'Conin': 'Lunes-Viernes: 8:30 - 18:30\nSábado: 8:30 - 16:30\nDomingo: Cerrado'
};

async function updateBranchHours() {
    try {
        console.log('Starting branch hours update...');

        // 1. Check if 'schedule' column exists, if not add it
        try {
            await db.query('SELECT schedule FROM branches LIMIT 1');
            console.log('Column "schedule" already exists.');
        } catch (err) {
            if (err.code === 'ER_BAD_FIELD_ERROR') {
                console.log('Adding "schedule" column...');
                await db.query('ALTER TABLE branches ADD COLUMN schedule TEXT');
            } else {
                throw err;
            }
        }

        // 2. Update each branch
        for (const [name, schedule] of Object.entries(schedules)) {
            // Use LIKE to match partial names if needed, but try exact first or flexible match
            // The user gave names like "corregidora", "pradera". In DB they might be "Sucursal Corregidora" etc.
            // We'll try to match by name containing the key.

            const [result] = await db.query('UPDATE branches SET schedule = ? WHERE name LIKE ?', [schedule, `%${name}%`]);

            if (result.affectedRows > 0) {
                console.log(`Updated schedule for: ${name}`);
            } else {
                console.log(`WARNING: Could not find branch matching: ${name}`);
            }
        }

        console.log('Finished updating branch hours.');
        process.exit(0);
    } catch (error) {
        console.error('Error updating branch hours:', error);
        process.exit(1);
    }
}

updateBranchHours();
