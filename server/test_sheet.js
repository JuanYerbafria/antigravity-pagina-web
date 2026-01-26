const axios = require('axios');
const SHEET_ID = '1n_OnY9MWejI9LnzyclUjRam9f8TBv4kAe2VjpYlbb4Y';

async function testFetch(sheetName) {
    try {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
        console.log(`Fetching: ${url}`);
        const response = await axios.get(url);
        const jsonString = response.data.substring(47).slice(0, -2);
        const data = JSON.parse(jsonString);

        if (data.status === 'error') {
            console.error('Sheet Error:', data.errors);
        } else {
            console.log(`Success! Rows found: ${data.table.rows.length}`);
            if (data.table.rows.length > 0) {
                console.log('Sample Row 1 Cell 0:', data.table.rows[0].c[0]?.v);
            }
        }
    } catch (e) {
        console.error('Fetch Failed:', e.message);
    }
}

testFetch('REFACCIONES');
