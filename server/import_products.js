const fs = require('fs');
const csv = require('csv-parser');
const db = require('./db');
const path = require('path');

const CSV_FILE = path.join(__dirname, 'products.csv');

async function importProducts() {
    const results = [];

    console.log('Starting product import...');
    console.log(`Reading file: ${CSV_FILE}`);

    if (!fs.existsSync(CSV_FILE)) {
        console.error('Error: products.csv not found in server directory.');
        console.error('Please place your CSV file at:', CSV_FILE);
        process.exit(1);
    }

    fs.createReadStream(CSV_FILE)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            console.log(`Parsed ${results.length} rows from CSV.`);

            let successCount = 0;
            let errorCount = 0;

            for (const row of results) {
                try {
                    // 1. Validate and Parse Specs
                    let specs = row.specs;
                    if (specs) {
                        // If it looks like JSON but might be double-quoted from CSV export issues, try to clean it
                        // However, csv-parser handles standard CSV escaping well.
                        // We just need to ensure it's valid JSON string for the DB or object.

                        // The user provided: {"Medida": "175 70 R13"}
                        // In the DB, specs is LONGTEXT. We should store it as a stringified JSON.

                        try {
                            // Check if it's already a valid JSON string
                            JSON.parse(specs);
                        } catch (e) {
                            // If not valid JSON, maybe it's because of single quotes or other issues?
                            // For now, assume user provides valid JSON structure in the CSV cell.
                            console.warn(`Warning: 'specs' for product '${row.name}' is not valid JSON. Attempting to store as is, but this may cause issues.`);
                        }
                    } else {
                        specs = '{}';
                    }

                    // 2. Prepare Data for Insertion
                    // Map CSV headers to DB columns. 
                    // Expected CSV headers: name, category, price, description, image_url, stock, specs, is_featured, rating, promocion

                    const product = {
                        name: row.name,
                        category: row.category,
                        price: parseFloat(row.price) || 0,
                        description: row.description || '',
                        image_url: row.image_url || null,
                        stock: parseInt(row.stock) || 0,
                        specs: specs,
                        is_featured: row.is_featured === '1' || row.is_featured === 'true' ? 1 : 0,
                        rating: parseFloat(row.rating) || 5.0,
                        promocion: row.promocion || null
                    };

                    // 3. Insert into DB
                    const query = `
                        INSERT INTO products 
                        (name, category, price, description, image_url, stock, specs, is_featured, rating, promocion) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `;

                    const values = [
                        product.name,
                        product.category,
                        product.price,
                        product.description,
                        product.image_url,
                        product.stock,
                        product.specs,
                        product.is_featured,
                        product.rating,
                        product.promocion
                    ];

                    await db.query(query, values);
                    successCount++;
                    process.stdout.write('.'); // Progress indicator

                } catch (error) {
                    errorCount++;
                    console.error(`\nError inserting product '${row.name}':`, error.message);
                }
            }

            console.log('\n\nImport completed!');
            console.log(`Successfully imported: ${successCount}`);
            console.log(`Failed: ${errorCount}`);
            process.exit(0);
        });
}

importProducts();
