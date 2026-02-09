import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-accent">Grupo Llantero Noguez</h3>
                        <p className="text-gray-400 mb-4">
                            Tu seguridad rueda con nosotros. Expertos en llantas, rines y mecánica general con más de 6 años de experiencia.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/profile.php?id=100063555729501&locale=es_LA" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="Facebook"><Facebook /></a>
                            <a href="https://www.instagram.com/grupo_llantero_noguez/?igsh=NXc5dTM3M29haHVn&utm_source=qr#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="Instagram"><Instagram /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">Enlaces Rápidos</h3>
                        <ul className="space-y-2">
                            <li><Link to="/productos" className="text-gray-400 hover:text-accent">Catálogo de Llantas</Link></li>
                            <li><Link to="/servicios" className="text-gray-400 hover:text-accent">Servicios Mecánicos</Link></li>
                            <li><Link to="/sucursales" className="text-gray-400 hover:text-accent">Nuestras Sucursales</Link></li>
                            <li><Link to="/contacto" className="text-gray-400 hover:text-accent">Agendar Cita</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">Contacto</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPin className="mr-2 text-accent flex-shrink-0" size={20} />
                                <span className="text-gray-400">Oficina Central: Prol. Corregidora Nte. #937 Col. Villas del Parque Querétaro, Qro.</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="mr-2 text-accent" size={20} />
                                <span className="text-gray-400">442 840 6201</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="mr-2 text-accent" size={20} />
                                <span className="text-gray-400">marketing.ventasnoguez@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">Horario</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>Lunes - Viernes: 8:00 AM - 6:30 PM</li>
                            <li>Sábado: 8:30 AM - 4:30 PM</li>
                            <li>Domingo: Cerrado</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Grupo Llantero Noguez. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
