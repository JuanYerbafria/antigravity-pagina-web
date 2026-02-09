import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Wrench } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('/services');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="container mx-auto px-4 py-12">
            <Helmet>
                <title>Servicios Mecánicos | Alineación, Balanceo y Más | Grupo Noguez</title>
                <meta name="description" content="Ofrecemos servicios de alineación, balanceo, frenos, suspensión y más en Querétaro. Contamos con tecnología de punta y técnicos expertos." />
            </Helmet>
            <h1 className="text-4xl font-bold text-center mb-4 text-primary">Nuestros Servicios</h1>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Contamos con el equipo más moderno y personal capacitado para brindarle el mejor mantenimiento a tu vehículo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map(service => {
                    const lowerName = service.name.toLowerCase();
                    let imageSrc = service.icon_url || null;

                    if (!imageSrc) {
                        if (lowerName.includes('alineaci')) imageSrc = '/images/servicios/alineacion.png';
                        else if (lowerName.includes('balanceo')) imageSrc = '/images/servicios/balanceo.png';
                        else if (lowerName.includes('bater')) imageSrc = '/images/servicios/bateria.png';
                        else if (lowerName.includes('rotaci')) imageSrc = '/images/servicios/rotacion.png';
                        else if (lowerName.includes('vulcanizadora movil') || lowerName.includes('móvil')) imageSrc = '/images/servicios/vulcanizadora_movil.png';
                        else if (lowerName.includes('vulcanizadora')) imageSrc = '/images/servicios/vulcanizadora.png';
                        else if (lowerName.includes('rin')) imageSrc = '/images/servicios/reparacion_de_rin.png';
                        else if (lowerName.includes('nitrogeno') || lowerName.includes('nitrógeno')) imageSrc = '/images/servicios/llenado_de_nitrogeno.png';
                        else if (lowerName.includes('seccionado')) imageSrc = '/images/servicios/seccionado_llanta.png';
                        else if (lowerName.includes('escaneo')) imageSrc = '/images/servicios/escaneo.png';
                        else if (lowerName.includes('frenos')) imageSrc = '/images/servicios/frenos.png';
                    }

                    return (
                        <div key={service.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-accent">
                            <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto overflow-hidden p-4">
                                {imageSrc ? (
                                    <img src={imageSrc} alt={service.name} className="w-full h-full object-contain" />
                                ) : (
                                    <Wrench className="text-primary" size={32} />
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-center mb-4 text-dark">{service.name}</h3>
                            <p className="text-gray-600 text-center leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Services;
