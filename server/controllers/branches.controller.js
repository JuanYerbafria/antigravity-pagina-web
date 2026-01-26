const { getSheetData, parseSheetData } = require('../utils/googleSheets');

exports.getBranches = async (req, res) => {
    try {
        const sheetData = await getSheetData('SUCURSALES');

        if (!sheetData) {
            return res.status(500).json({ message: 'Error al obtener datos de Google Sheets' });
        }

        const rawBranches = parseSheetData(sheetData);

        const branches = rawBranches.map(branch => {
            let lat = null;
            let lng = null;

            // Try to parse coordinates if they exist (format: "lat, lng")
            if (branch.coordenadas) {
                const parts = branch.coordenadas.toString().split(',');
                if (parts.length === 2) {
                    lat = parseFloat(parts[0].trim());
                    lng = parseFloat(parts[1].trim());
                }
            }

            return {
                id: branch.id || Math.random(),
                name: branch.name || 'Sucursal',
                address: branch.address || '',
                phone: branch.phone || '',
                map_url: branch.map_url || '',
                lat: lat,
                lng: lng
            };
        });

        res.json(branches);
    } catch (error) {
        console.error('Error fetching branches:', error);
        res.status(500).json({ message: 'Error al obtener sucursales' });
    }
};
