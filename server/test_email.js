const nodemailer = require('nodemailer');
require('dotenv').config();

const testEmail = async () => {
    try {
        console.log('Probando configuración de correo...');
        console.log('User:', process.env.EMAIL_USER);

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS.replace(/\s/g, '')
            },
            tls: {
                rejectUnauthorized: false,
                minVersion: 'TLSv1.2'
            },
            debug: true,
            logger: true
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'marketing.ventasnoguez@gmail.com',
            subject: 'Test Email from Server',
            text: 'Este es un mensaje de prueba para verificar la configuración de Nodemailer.'
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado con éxito:', info.response);
    } catch (error) {
        console.error('Error detallado al enviar correo:', error);
    }
};

testEmail();
