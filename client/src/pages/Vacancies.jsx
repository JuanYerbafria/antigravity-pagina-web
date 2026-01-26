import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, Briefcase, Users } from 'lucide-react';

const Vacancies = () => {
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const response = await fetch('/api/vacancies');
                if (!response.ok) {
                    throw new Error('Error al cargar vacantes');
                }
                const data = await response.json();
                setVacancies(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVacancies();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex justify-center items-center text-red-500">
            Error: {error}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            {/* Header */}
            <div className="bg-cover bg-center bg-fixed text-white py-24 mb-12 relative overflow-hidden" style={{ backgroundImage: "url('/images/general/fondovacante.png')" }}>
                <div className="absolute inset-0 bg-black/70 z-0"></div>
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl z-0"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl z-0"></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in-down text-white">
                        Únete a Nuestro Equipo
                    </h1>
                    <p className="text-2xl md:text-3xl font-light opacity-90 animate-fade-in-up">
                        Forma parte de la familia <span className="font-bold text-accent">Grupo Llantero Noguez</span>
                    </p>
                    <div className="mt-8 flex justify-center animate-fade-in-up delay-100">
                        <div className="h-1.5 w-32 bg-accent rounded-full shadow-[0_0_15px_rgba(255,165,0,0.5)]"></div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <div className="inline-flex items-center bg-blue-50 px-5 py-2.5 rounded-xl text-blue-700 font-semibold shadow-sm border border-blue-100">
                        <Users size={20} className="mr-2.5" />
                        <span>{vacancies.length} Vacantes activas</span>
                    </div>
                    {/* Add filters here if needed later */}
                </div>

                <div className="space-y-4">
                    {vacancies.map((vacancy) => (
                        <div key={vacancy.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                                            {vacancy.area}
                                        </span>
                                        <span className="text-gray-400 text-sm">{vacancy.fecha_publicacion}</span>
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                                        {vacancy.nombre_vacante}
                                    </h3>

                                    <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={18} className="text-gray-400" />
                                            <span className="text-sm">{vacancy.lugar}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={18} className="text-gray-400" />
                                            <span className="text-sm">{vacancy.tiempo}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 line-clamp-2 mb-0">
                                        {vacancy.Descripcion}
                                    </p>
                                </div>

                                <div className="w-full md:w-auto flex flex-col items-stretch md:items-end gap-2">
                                    <Link
                                        to={`/unete-al-equipo/${vacancy.id}`}
                                        className="bg-[var(--color-primary)] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                    >
                                        Ver detalles <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    {vacancies.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <Briefcase size={48} className="mx-auto mb-4 opacity-50" />
                            <p>No hay vacantes disponibles en este momento.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Vacancies;
