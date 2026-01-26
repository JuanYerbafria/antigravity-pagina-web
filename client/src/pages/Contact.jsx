import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await axios.post('http://localhost:3001/api/contact', formData);
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-12 text-primary">Contáctanos</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-dark">Información de Contacto</h2>
                    <p className="text-gray-600 mb-8">
                        Estamos aquí para ayudarte. Si tienes alguna duda sobre nuestros productos o servicios, no dudes en contactarnos.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="bg-blue-100 p-3 rounded-full mr-4">
                                <MapPin className="text-primary" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-dark">Oficina Central</h3>
                                <p className="text-gray-600">Prol. Corregidora Nte. #937 Col. Villas del Parque Querétaro, Qro.</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-blue-100 p-3 rounded-full mr-4">
                                <Phone className="text-primary" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-dark">Teléfono</h3>
                                <p className="text-gray-600">442 840 6201</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-blue-100 p-3 rounded-full mr-4">
                                <Mail className="text-primary" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-dark">Email</h3>
                                <p className="text-gray-600">marketing.ventasnoguez@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Map Embed */}
                    <div className="mt-8 h-64 bg-gray-200 rounded-lg overflow-hidden">
                        <iframe
                            src="https://maps.google.com/maps?q=Prol.+Corregidora+Nte.+937,+Villas+del+Parque,+Queretaro&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Mapa Sucursal Corregidora"
                        ></iframe>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-dark">Envíanos un mensaje</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Nombre Completo</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                placeholder="Tu nombre"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                placeholder="tucorreo@ejemplo.com"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Teléfono</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                placeholder="555-000-0000"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Mensaje</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                placeholder="¿En qué podemos ayudarte?"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-3 rounded transition-colors flex justify-center items-center"
                        >
                            {status === 'sending' ? 'Enviando...' : <><Send className="mr-2" size={20} /> Enviar Mensaje</>}
                        </button>

                        {status === 'success' && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                Hubo un error al enviar el mensaje. Inténtalo de nuevo.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
