const { getSheetData, parseSheetData } = require('../utils/googleSheets');

exports.getServices = async (req, res) => {
    try {
        const sheetData = await getSheetData('SERVICIOS');

        if (!sheetData) {
            return res.status(500).json({ message: 'Error al obtener datos de Google Sheets' });
        }

        const rawServices = parseSheetData(sheetData);

        // Map and clean up the data
        const services = rawServices.map(service => ({
            id: service.id || Math.random(), // Fallback ID if missing
            name: service.name || 'Servicio sin nombre',
            description: service.description || '',
            icon_url: service.icon_url || null
        }));

        res.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Error al obtener servicios' });
    }
};
