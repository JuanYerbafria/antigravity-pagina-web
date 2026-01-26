const axios = require('axios');

// Google Sheets configuration
const SHEET_ID = '1n_OnY9MWejI9LnzyclUjRam9f8TBv4kAe2VjpYlbb4Y';

/**
 * Fetch all data from a specific Google Sheet tab
 */
const getSheetData = async (sheetName) => {
    try {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
        const response = await axios.get(url);

        // Parse the response (Google returns JSONP, need to extract JSON)
        // Parse the response (Google returns JSONP, need to extract JSON)
        // Regex to match the content inside setResponse(...)
        const match = response.data.match(/google\.visualization\.Query\.setResponse\((.*)\);/);

        if (!match) {
            throw new Error('Failed to parse Google Sheets response format');
        }

        const jsonString = match[1];
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
    const headers = cols.map(col => col.label || '');

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
        return item;
    }).filter(item => item !== null); // Filter out empty rows

    return parsedRows;
};

module.exports = {
    getSheetData,
    parseSheetData
};
