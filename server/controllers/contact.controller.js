const nodemailer = require('nodemailer');

exports.submitContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'marketing.ventasnoguez@gmail.com',
            subject: `Nuevo Mensaje de Contacto: ${name}`,
            html: `
                <h3>Nuevo mensaje desde el sitio web</h3>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Mensaje enviado correctamente' });
    } catch (error) {
        console.error('Error en contacto:', error);
        res.status(500).json({ message: 'Error al enviar el mensaje', error: error.message });
    }
};
