const axios = require('axios');

// Google Sheets configuration
const SHEET_ID = '179-I_ARpse1MJqox5gzSQ8MjlYOFWSpMcTcgm_uwr1g';
const SHEET_NAME = 'Inventario';

/**
 * Fetch all data from the Google Sheet
 */
const getSheetData = async () => {
    try {
        // Using Google Sheets API v4 public endpoint
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

        const response = await axios.get(url);

        // Parse the response (Google returns JSONP, need to extract JSON)
        const jsonString = response.data.substring(47).slice(0, -2);
        const data = JSON.parse(jsonString);

        return data;
    } catch (error) {
        console.error('Error fetching Google Sheets data:', error.message);
        throw new Error('Failed to fetch inventory data');
    }
};

/**
 * Parse Google Sheets data into usable format
 */
const parseSheetData = (data) => {
    const rows = data.table.rows;
    const cols = data.table.cols;

    // Get column headers
    const headers = cols.map(col => col.label || '');

    // Parse rows
    const products = rows.map(row => {
        const product = {};
        row.c.forEach((cell, index) => {
            const header = headers[index];
            product[header] = cell ? cell.v : null;
        });
        return product;
    });

    return products;
};

/**
 * Extract tire measurements from description
 * Very flexible to handle all possible variations
 */
const extractMeasurements = (description) => {
    if (!description) return null;

    // Clean up: remove extra spaces, normalize
    const cleaned = description.trim().replace(/\s+/g, ' ');

    // Try multiple patterns - order matters!
    const patterns = [
        // Pattern 1: 4-digit width "1000 R16", "1000R16", "1000 16"
        /\b(\d{4})\s*[-\/]?\s*R?\s*(\d{2}(?:\.\d+)?)\b/i,

        // Pattern 2: 3-digit with slash "205/60R16"
        /\b(\d{3})\s*\/\s*(\d{2})\s*R?\s*(\d{2})\b/i,

        // Pattern 3: 3-digit with various separators (spaces, dashes, Xs, double slashes)
        // Matches: "205 60 16", "205-60-16", "205x60x16", "205/60/16"
        /\b(\d{3})\s*[\s\/\-xX]+\s*(\d{2})\s*[R\s\/\-xX]*\s*(\d{2})\b/i,

        // Pattern 4: Compact "2056016" or "205R16"
        /\b(\d{3})(\d{2})R?(\d{2})\b/i,

        // Pattern 5: 2-digit width "11 R22.5"
        /\b(\d{2})\s*[-\/]?\s*R?\s*(\d{2}(?:\.\d+)?)\b/i
    ];

    for (const pattern of patterns) {
        const match = cleaned.match(pattern);
        if (match) {
            // Truck tires (2 or 4-digit width)
            if (match.length === 3 && (match[1].length === 2 || match[1].length === 4)) {
                return {
                    ancho: match[1],
                    perfil: '',
                    rin: match[2]
                };
            }
            // Standard tires (3-digit width)
            if (match.length === 4) {
                return {
                    ancho: match[1],
                    perfil: match[2],
                    rin: match[3]
                };
            }
        }
    }

    return null;
};

/**
 * Filter products to show only requested columns
 */
const filterColumns = (products) => {
    if (products.length === 0) return [];

    const availableColumns = Object.keys(products[0]);
    const desiredColumns = ['DESCRIPCION', 'P.U', 'EXISTENCIA', 'DESC.25%', 'PROM.4X3', 'BODEGA'];

    return products.map(product => {
        const filtered = {};
        desiredColumns.forEach(desiredCol => {
            if (product.hasOwnProperty(desiredCol)) {
                filtered[desiredCol] = product[desiredCol];
            } else {
                const matchingKey = availableColumns.find(key =>
                    key.trim().toLowerCase() === desiredCol.trim().toLowerCase()
                );
                filtered[desiredCol] = matchingKey ? product[matchingKey] : null;
            }
        });
        return filtered;
    });
};

/**
 * Search tires by measurements
 */
const searchByMeasurements = async (req, res) => {
    try {
        // Trim inputs to avoid whitespace mismatches
        const ancho = req.query.ancho ? req.query.ancho.trim() : '';
        const perfil = req.query.perfil ? req.query.perfil.trim() : '';
        const rin = req.query.rin ? req.query.rin.trim() : '';

        console.log(`\n=== BÚSQUEDA: ancho="${ancho}", perfil="${perfil}", rin="${rin}" ===`);

        const data = await getSheetData();
        let products = parseSheetData(data);

        console.log(`Total productos en sheet: ${products.length}`);

        let matchedCount = 0;
        let missedHits = []; // Potentially missed items

        let results = products.filter(product => {
            const measurements = extractMeasurements(product.DESCRIPCION);

            let isMatch = false;
            if (measurements) {
                // Determine matches
                let anchoMatch = !ancho || measurements.ancho === ancho;
                // Perfil match logic: if search perfil is empty, it matches anything (but we usually want accurate matches)
                // If truck tire (no profile), handle that too.
                let perfilMatch = !perfil || (measurements.perfil === perfil || (perfil === '' && measurements.perfil === ''));
                let rinMatch = !rin || measurements.rin === rin;

                isMatch = anchoMatch && perfilMatch && rinMatch;
            }

            if (isMatch) {
                matchedCount++;
            } else {
                // Debugging for missing items
                // If we have an 'ancho' search term, and the description *contains* it, but we didn't match...
                if (ancho && product.DESCRIPCION && product.DESCRIPCION.includes(ancho)) {
                    // Only log a few
                    if (missedHits.length < 15) {
                        missedHits.push({
                            desc: product.DESCRIPCION,
                            extracted: measurements
                        });
                    }
                }
            }

            return isMatch;
        });

        console.log(`✓ Total coincidencias: ${matchedCount} de ${products.length}`);

        if (missedHits.length > 0) {
            console.log(`\n?! POSIBLES REGISTROS PERDIDOS (contiene "${ancho}" pero no filtra):`);
            missedHits.forEach((item, i) => {
                let status = "NO REGEX MATCH";
                if (item.extracted) {
                    status = `Extracted: A:${item.extracted.ancho} P:${item.extracted.perfil} R:${item.extracted.rin}`;
                }
                console.log(`  ${i + 1}. [${status}] "${item.desc}"`);
            });
        }

        results = filterColumns(results);

        res.json({
            success: true,
            count: results.length,
            data: results
        });

    } catch (error) {
        console.error('Error searching inventory:', error);
        res.status(500).json({
            success: false,
            message: 'Error al buscar en el inventario',
            error: error.message
        });
    }
};

/**
 * Get all inventory data
 */
const getAllInventory = async (req, res) => {
    try {
        const data = await getSheetData();
        let products = parseSheetData(data);
        products = filterColumns(products);

        res.json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el inventario',
            error: error.message
        });
    }
};

module.exports = {
    searchByMeasurements,
    getAllInventory
};
