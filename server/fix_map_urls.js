const db = require('./db');

async function fixMapUrls() {
    try {
        console.log('Starting map URL fix...');

        // 1. Get all branches
        const [branches] = await db.query('SELECT id, name, address FROM branches');
        console.log(`Found ${branches.length} branches.`);

        // 2. Update each branch
        for (const branch of branches) {
            if (!branch.address) {
                console.log(`Skipping branch ${branch.name} (no address)`);
                continue;
            }

            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`;

            await db.query('UPDATE branches SET map_url = ? WHERE id = ?', [mapUrl, branch.id]);
            console.log(`Updated URL for: ${branch.name}`);
        }

        console.log('Finished fixing map URLs.');
        process.exit(0);
    } catch (error) {
        console.error('Error fixing map URLs:', error);
        process.exit(1);
    }
}

fixMapUrls();
