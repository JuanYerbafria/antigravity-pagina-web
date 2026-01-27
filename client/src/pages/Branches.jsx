import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { MapPin, Phone, Navigation } from 'lucide-react';

const Branches = () => {
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await api.get('/branches');
                setBranches(response.data);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        };

        fetchBranches();
    }, []);

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-8 text-primary">Nuestras Sucursales</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {branches.map(branch => (
                    <div key={branch.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Map Placeholder (In a real app, could be an embedded Google Map) */}
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCDz1ixZ23tPb1tS-av2ob3LdhEby1D0zU&q=${encodeURIComponent(branch.address)}`} // Note: Needs API Key
                                allowFullScreen
                                title={branch.name}
                            ></iframe>
                            {/* Fallback if no API key */}
                            <div className="absolute text-gray-500 flex flex-col items-center">
                                <MapPin size={32} className="mb-2" />
                                <span>Mapa de Ubicación</span>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-4 text-dark">{branch.name}</h3>

                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <MapPin className="text-accent mr-3 mt-1 flex-shrink-0" size={20} />
                                    <p className="text-gray-600">{branch.address}</p>
                                </div>

                                <div className="flex items-center">
                                    <Phone className="text-accent mr-3" size={20} />
                                    <a
                                        href={`https://wa.me/${String(branch.phone || '').replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-accent hover:underline transition-colors"
                                    >
                                        {branch.phone || 'Sin número'}
                                    </a>
                                </div>

                                {branch.schedule && (
                                    <div className="flex items-start">
                                        <div className="mt-1 mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                        </div>
                                        <div className="text-gray-600 text-sm whitespace-pre-line">
                                            {branch.schedule}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {(() => {
                                let mapLink = branch.map_url;
                                if (!mapLink) {
                                    if (branch.lat && branch.lng) {
                                        mapLink = `https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`;
                                    } else {
                                        mapLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branch.address)}`;
                                    }
                                }

                                return (
                                    <a
                                        href={mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-6 block w-full bg-primary text-white text-center py-2 rounded hover:bg-blue-800 transition-colors flex items-center justify-center"
                                    >
                                        <Navigation size={18} className="mr-2" /> Cómo llegar
                                    </a>
                                );
                            })()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Branches;
