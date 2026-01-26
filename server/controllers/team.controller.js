const { getSheetData, parseSheetData } = require('../utils/googleSheets');

const getTeam = async (req, res) => {
    try {
        const rawData = await getSheetData('EQUIPO');

        if (!rawData) {
            return res.status(500).json({ message: 'Error fetching team data' });
        }

        const team = parseSheetData(rawData);

        // Log for debugging
        console.log('Fetched team members:', team.length);

        res.json(team);
    } catch (error) {
        console.error('Error in getTeam:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getTeam
};
