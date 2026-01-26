const axios = require('axios');

async function verify() {
    try {
        console.log('--- Verifying Services ---');
        const services = await axios.get('http://localhost:3001/api/services');
        console.log(`Status: ${services.status}`);
        console.log(`Count: ${services.data.length}`);
        if (services.data.length > 0) {
            console.log('First Service:', services.data[0].name);
        }

        console.log('\n--- Verifying Products ---');
        const products = await axios.get('http://localhost:3001/api/products?limit=1');
        console.log(`Status: ${products.status}`);
        console.log(`Count: ${products.data.length}`);
        if (products.data.length > 0) {
            console.log('First Product:', products.data[0].name);
        }

        console.log('\n--- Verifying Branches ---');
        const branches = await axios.get('http://localhost:3001/api/branches');
        console.log(`Status: ${branches.status}`);
        console.log(`Count: ${branches.data.length}`);
        if (branches.data.length > 0) {
            console.log('First Branch:', branches.data[0].name);
            console.log('First Branch Address:', branches.data[0].address);
        }

        console.log('\n--- Verifying Blog ---');
        const posts = await axios.get('http://localhost:3001/api/blog');
        console.log(`Status: ${posts.status}`);
        console.log(`Count: ${posts.data.length}`);
        if (posts.data.length > 0) {
            console.log('First Post:', posts.data[0].title);
        }

    } catch (error) {
        console.error('Verification failed:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

verify();
