import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, MapPin, Clock, Calendar, Send } from 'lucide-react';

const VacancyDetail = () => {
    const { id } = useParams();
    const [vacancy, setVacancy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVacancy = async () => {
            try {
                const response = await fetch(`/api/vacancies/${id}`);
                if (!response.ok) {
                    throw new Error('Error al cargar la vacante');
                }
                const data = await response.json();
                setVacancy(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVacancy();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        </div>
    );

    if (error || !vacancy) return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
            <p className="text-xl text-red-500 mb-4">Error: {error || 'Vacante no encontrada'}</p>
            <Link to="/unete-al-equipo" className="text-accent hover:underline">
                Volver a la lista
            </Link>
        </div>
    );

    const requirements = vacancy.requisitos
        ? vacancy.requisitos.split('-').filter(req => req.trim().length > 0)
        : [];

    const getRelativeTime = (dateString) => {
        if (!dateString) return '';
        const parts = dateString.split('/');
        if (parts.length !== 3) return `Publicado el ${dateString}`;

        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);

        const pubDate = new Date(year, month, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        pubDate.setHours(0, 0, 0, 0);

        const diffTime = today - pubDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Publicado hoy';
        if (diffDays === 1) return 'Publicado hace 1 día';
        return `Publicado hace ${diffDays} días`;
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header separate from navbar designed to match the request */}
            <div
                className="relative bg-primary text-white pt-24 pb-32 shadow-lg bg-cover bg-center"
                style={{ backgroundImage: "url('/images/general/vacante.webp')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 z-0"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <Link to="/unete-al-equipo" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors font-medium">
                        <ArrowLeft size={18} className="mr-2" /> Volver a la lista
                    </Link>

                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            {vacancy.area}
                        </span>
                        <span className="flex items-center text-white/80 text-sm">
                            <Calendar size={14} className="mr-1" /> {getRelativeTime(vacancy.fecha_publicacion)}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white drop-shadow-md">
                        {vacancy.nombre_vacante}
                    </h1>

                    <div className="flex flex-wrap gap-6 text-white/90 font-medium">
                        <div className="flex items-center gap-2">
                            <MapPin size={20} />
                            <span>{vacancy.lugar}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={20} />
                            <span>{vacancy.tiempo}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-24 relative z-20">
                <div className="bg-white rounded-xl shadow-2xl p-6 md:p-10 max-w-4xl mx-auto border border-gray-100">

                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Descripción del Puesto</h3>
                        <p className="text-gray-700 leading-relaxed text-lg italic border-l-4 border-accent pl-4 py-2 bg-gray-50 rounded-r-lg">
                            "{vacancy.Descripcion}"
                        </p>
                    </div>

                    <div className="mb-12">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Requisitos</h3>
                        <ul className="space-y-4">
                            {requirements.map((req, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckCircle size={22} className="text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700 text-lg">{req.trim()}</span>
                                </li>
                            ))}
                            {requirements.length === 0 && (
                                <p className="text-gray-500 italic">No se especificaron requisitos.</p>
                            )}
                        </ul>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <div className="mb-4 md:mb-0">
                            <p className="text-sm text-gray-500 mb-1">ID de vacante: #{vacancy.id}</p>
                            <p className="font-bold text-gray-800">¿Crees que eres el indicado?</p>
                        </div>
                        <Link
                            to="/contacto"
                            className="w-full md:w-auto bg-[var(--color-primary)] hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-md hover:shadow-xl transition-all flex items-center justify-center text-lg gap-2"
                        >
                            <Send size={20} />
                            Aplicar a esta vacante
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default VacancyDetail;
