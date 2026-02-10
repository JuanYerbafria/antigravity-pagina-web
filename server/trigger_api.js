const axios = require('axios');

async function triggerContact() {
    try {
        console.log('Enviando petición a http://localhost:3001/api/contact...');
        const response = await axios.post('http://localhost:3001/api/contact', {
            name: 'Test Manual Robot',
            email: 'test@example.com',
            phone: '1234567890',
            message: 'Este es un mensaje automático para generar logs.'
        });
        console.log('Respuesta del servidor:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Error del servidor (500):', error.response.data);
        } else {
            console.error('Error de red/conexión:', error.message);
        }
    }
}

triggerContact();
