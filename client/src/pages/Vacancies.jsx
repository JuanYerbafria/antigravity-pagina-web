import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, Briefcase, Users, Wrench, ShieldCheck, Cpu } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

import api from '../utils/api';

const Vacancies = () => {
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const response = await api.get('/vacancies');
                setVacancies(response.data);
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
        <div className="min-h-screen bg-white">
            <Helmet>
                <title>Únete al Equipo | Bolsa de Trabajo | Grupo Llantero Noguez</title>
                <meta name="description" content="Forma parte de la familia Grupo Llantero Noguez. Consulta nuestras vacantes activas y únete a un equipo comprometido con la excelencia." />
            </Helmet>

            {/* HERO — MOCKUP STYLE (SYNCED WITH BLOG) */}
            <div className="relative h-[600px] w-full overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed flex items-center" style={{ backgroundImage: "url('/images/general/fondovacante.webp')" }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/40 to-transparent z-0"></div>
                <div className="container mx-auto px-4 relative z-10 py-20">
                    <div className="max-w-4xl animate-fade-in-down">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] animate-fade-in-down drop-shadow-2xl">
                            Únete a Nuestro <br /><span className="text-accent underline decoration-4 underline-offset-8">Equipo</span>
                        </h1>
                        <div className="max-w-2xl border-l-4 border-accent pl-6 mb-8 mt-6 animate-fade-in-up">
                            <p className="text-gray-100 text-base md:text-lg font-medium leading-relaxed drop-shadow-lg opacity-90">
                                Forma parte de la familia <span className="text-white font-bold italic">Grupo Llantero Noguez</span>.
                            </p>
                        </div>
                        <a
                            href="#vacantes"
                            className="inline-block bg-accent hover:bg-white hover:text-accent text-white font-black py-5 px-12 rounded-sm transition-all shadow-2xl tracking-widest text-sm uppercase"
                        >
                            Ver Vacantes
                        </a>
                    </div>
                </div>
            </div>

            {/* PHILOSOPHY GRID — MOCKUP STYLE */}
            <div className="container mx-auto px-4 py-24">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[350px]">

                    {/* CARD 1 — Precisión Técnica */}
                    <div className="md:col-span-4 bg-gray-50 p-12 flex flex-col justify-center rounded-2xl hover:shadow-xl transition-all border border-gray-100 group">
                        <div className="mb-8 text-accent transform group-hover:scale-110 transition-transform">
                            <Wrench size={48} />
                        </div>
                        <h3 className="text-3xl font-black text-primary mb-4 drop-shadow-sm">Precisión Técnica</h3>
                        <p className="text-gray-500 font-medium leading-relaxed">
                            Aquí no solo ponemos llantas, hacemos las cosas bien. Cada ajuste se realiza de acuerdo a las características y necesidades específicas de cada vehículo.
                        </p>
                    </div>

                    {/* CARD 2 — Innovación en Servicio */}
                    <div className="md:col-span-8 relative rounded-2xl overflow-hidden group">
                        <div className="absolute inset-0">
                            <img src="/images/general/innovacion_equipo.webp" alt="Innovación" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
                        </div>
                        <div className="absolute inset-0 p-12 flex flex-col justify-end text-left items-start">
                            <h3 className="text-3xl lg:text-5xl font-black text-white mb-4 drop-shadow-lg">Innovación en Servicio</h3>
                            <p className="text-white/80 font-medium text-lg max-w-xl leading-relaxed drop-shadow-md">
                                Cuidamos el vehículo con herramientas modernas que garantizan diagnósticos exactos y una gestión sin complicaciones.
                            </p>
                        </div>
                    </div>

                    {/* CARD 3 — Compromiso con la Seguridad */}
                    <div className="md:col-span-8 bg-zinc-900 rounded-2xl p-12 flex flex-col lg:flex-row items-center gap-12 group overflow-hidden border border-white/5">
                        <div className="flex-1">
                            <h3 className="text-3xl lg:text-5xl font-black text-white mb-6">Compromiso con <br /> la Seguridad</h3>
                            <p className="text-gray-400 font-medium text-lg leading-relaxed">
                                Nuestra responsabilidad termina donde empieza la seguridad del conductor. La integridad es nuestro componente principal.
                            </p>
                        </div>
                        <div className="w-48 h-48 bg-accent rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-accent/20 transform group-hover:rotate-6 transition-transform">
                            <ShieldCheck size={80} strokeWidth={2.5} />
                        </div>
                    </div>

                    {/* CARD 4 — Nuestra Cultura */}
                    <div className="md:col-span-4 bg-accent p-12 rounded-2xl flex flex-col justify-start relative overflow-hidden group">
                        <div className="z-10">
                            <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">Nuestra Cultura</h3>
                            <p className="text-white/90 font-medium leading-relaxed text-lg">
                                Excelencia operativa en un entorno de respeto y crecimiento continuo. <br />
                                ¡Súmate al equipo!
                            </p>
                        </div>
                        <div className="absolute bottom-0 right-0 opacity-10 transform translate-x-12 translate-y-12 transition-transform group-hover:scale-125">
                            <Users size={250} />
                        </div>
                    </div>
                </div>
            </div>

            {/* VACANCIES LISTING — BOTTOM */}
            <div id="vacantes" className="bg-gray-50 py-24 pb-32 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 flex flex-col items-center">
                        <div className="inline-block px-4 py-1.5 mb-2 text-xs font-bold tracking-widest text-accent uppercase bg-red-50 rounded-full border border-accent/10">
                            Vacantes
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black text-primary drop-shadow-sm mb-4">
                            Estamos <span className="text-accent">contratando</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-accent rounded-full mb-10"></div>
                        <p className="text-gray-500 font-bold tracking-tight uppercase">
                            Actualmente contamos con {vacancies.length} vacantes activas
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto space-y-4">
                        {vacancies.map((vacancy) => (
                            <Link
                                to={`/unete-al-equipo/${vacancy.id}`}
                                key={vacancy.id}
                                className="block bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-xl hover:border-accent/30 transition-all group scale-100 active:scale-[0.99]"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-sm uppercase tracking-widest">
                                                {vacancy.area}
                                            </span>
                                            <span className="text-gray-400 text-xs font-bold">{vacancy.fecha_publicacion}</span>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-black text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                                            {vacancy.nombre_vacante}
                                        </h3>

                                        <div className="flex flex-wrap gap-6 text-gray-500 mb-0 font-bold uppercase text-[11px] tracking-widest">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} className="text-accent" />
                                                <span>{vacancy.lugar}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} className="text-accent" />
                                                <span>{vacancy.tiempo}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-auto self-end">
                                        <div className="inline-flex items-center bg-gray-50 text-primary font-black py-3 px-6 rounded-sm border border-gray-200 group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300 text-xs tracking-widest uppercase">
                                            Ver Perfil <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {vacancies.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-2xl shadow-inner border border-dashed border-gray-200">
                                <Briefcase size={64} className="mx-auto mb-6 text-gray-200" />
                                <p className="text-lg text-gray-400 font-bold uppercase tracking-widest">No hay vacantes disponibles en este momento.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vacancies;
