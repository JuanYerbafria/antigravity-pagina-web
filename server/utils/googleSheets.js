const axios = require('axios');

// Google Sheets configuration
const MAIN_SHEET_ID = '1n_OnY9MWejI9LnzyclUjRam9f8TBv4kAe2VjpYlbb4Y';
const PROMO_SHEET_ID = '179-I_ARpse1MJqox5gzSQ8MjlYOFWSpMcTcgm_uwr1g';

/**
 * Fetch all data from a specific Google Sheet tab
 */
const getSheetData = async (sheetName, targetSheetId = null) => {
    try {
        const sheetId = targetSheetId || MAIN_SHEET_ID;
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}&t=${Date.now()}`;
        const response = await axios.get(url, { headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' } });

        // BUSCAR EL JSON DE FORMA SEGURA (entre la primera llave '{' y la última '}')
        const startIndex = response.data.indexOf('{');
        const endIndex = response.data.lastIndexOf('}') + 1;

        if (startIndex === -1 || endIndex === 0) {
            throw new Error('No se encontró el contenido JSON en la respuesta de Google Sheets');
        }

        const jsonString = response.data.substring(startIndex, endIndex);
        const data = JSON.parse(jsonString);

        return data;
    } catch (error) {
        console.error(`Error fetching Google Sheets data from ${sheetName}:`, error.message);
        return null; // Return null instead of throwing to allow partial success
    }
};

/**
 * Parse Google Sheets data into an array of objects
 */
const parseSheetData = (data) => {
    if (!data || !data.table) return [];

    const rows = data.table.rows;
    const cols = data.table.cols;

    // Get column headers
    const headers = cols.map(col => (col.label || '').trim());

    // Parse rows and create objects array
    const parsedRows = rows.map((row, index) => {
        const item = { _tempId: index }; // Temporary ID

        // Handle empty rows
        if (!row || !row.c) return null;

        row.c.forEach((cell, colIndex) => {
            const header = headers[colIndex];
            if (header) {
                let value = cell ? cell.v : null;

                // Fix Google Sheets Date format: "Date(2026,0,23)"
                if (typeof value === 'string' && value.startsWith('Date(')) {
                    const parts = value.match(/Date\((\d+),(\d+),(\d+)\)/);
                    if (parts) {
                        const year = parseInt(parts[1]);
                        const month = parseInt(parts[2]) + 1; // 0-indexed
                        const day = parseInt(parts[3]);
                        value = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
                    }
                }

                item[header] = value;
            }
        });

        // Filter out items that are virtually empty (especially important for gviz auto-fill rows)
        const hasData = Object.keys(item).some(key => key !== '_tempId' && item[key] !== null && item[key] !== '');
        return hasData ? item : null;
    }).filter(item => item !== null); // Filter out empty rows

    return parsedRows;
};

module.exports = {
    getSheetData,
    parseSheetData,
    MAIN_SHEET_ID,
    PROMO_SHEET_ID
};
