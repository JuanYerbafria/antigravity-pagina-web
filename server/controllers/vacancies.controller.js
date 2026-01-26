const { getSheetData, parseSheetData } = require('../utils/googleSheets');

/**
 * Get all vacancies from Google Sheet
 * @route GET /api/vacancies
 * @access Public
 */
exports.getVacancies = async (req, res) => {
    try {
        const data = await getSheetData('VACANTES');

        if (!data) {
            return res.status(500).json({ message: 'Error fetching vacancies data' });
        }

        const vacancies = parseSheetData(data);

        // Filter out empty rows or rows without an ID
        const activeVacancies = vacancies.filter(vacancy => vacancy.id && vacancy.nombre_vacante);

        res.status(200).json(activeVacancies);
    } catch (error) {
        console.error('Error in getVacancies controller:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * Get single vacancy by ID
 * @route GET /api/vacancies/:id
 * @access Public
 */
exports.getVacancyById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getSheetData('VACANTES');

        if (!data) {
            return res.status(500).json({ message: 'Error fetching vacancies data' });
        }

        const vacancies = parseSheetData(data);
        const vacancy = vacancies.find(v => String(v.id) === String(id));

        if (!vacancy) {
            return res.status(404).json({ message: 'Vacante no encontrada' });
        }

        res.status(200).json(vacancy);
    } catch (error) {
        console.error('Error in getVacancyById controller:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
