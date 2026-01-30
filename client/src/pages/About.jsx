import historyBg from '../assets/history-bg.webp';
import { Target, Award } from 'lucide-react';



import { useState, useEffect } from 'react';

const About = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await fetch('/api/team');
                if (!response.ok) {
                    throw new Error('Failed to fetch team data');
                }
                const data = await response.json();
                setTeam(data);
            } catch (error) {
                console.error('Error fetching team data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);
    return (
        <div className="w-full">
            {/* Hero Section - Nuestra Historia */}
            <div className="relative w-full min-h-[90vh] flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: `url(${historyBg})` }}>
                {/* Dark Overlay */}


                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 text-center">
                    <div className="mb-12">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tighter">
                            NUESTRA <span className="text-accent">HISTORIA</span>
                        </h1>
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wide">
                            IMPULSADOS POR EL FUTURO
                        </h2>
                    </div>

                    <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
                        Grupo Llantero Noguez nació en el 2019 como una empresa familiar mexicana, con el propósito de aportar seguridad y confianza a los conductores de Querétaro. Con la firme convicción de que una llanta no es solo un producto, sino un elemento clave para la protección de las familias en cada trayecto, se sentaron las bases de una empresa guiada por el compromiso, la honestidad y el servicio de calidad.

                        Desde hace más de seis años, este proyecto ha crecido gracias a la confianza de miles de clientes y talleres que han encontrado en Grupo Llantero Noguez un aliado confiable para el cuidado de sus vehículos. Su enfoque moderno, su cercanía con la comunidad a través de redes sociales y su dedicación diaria por mejorar la atención y los procesos, reflejan el espíritu emprendedor con el que fue fundada la empresa: estar siempre más cerca de las personas, ofreciendo no solo productos, sino tranquilidad y respaldo en cada camino recorrido.
                        <br /><br />
                        Desde hace más de seis años, este proyecto ha crecido gracias a la confianza de miles de clientes y talleres que han encontrado en Grupo Llantero Noguez un aliado confiable para el cuidado de sus vehículos. Su enfoque moderno, su cercanía con la comunidad a través de redes sociales y su dedicación diaria por mejorar la atención y los procesos, reflejan el espíritu emprendedor con el que fue fundada la empresa: estar siempre más cerca de las personas, ofreciendo no solo productos, sino tranquilidad y respaldo en cada camino recorrido.
                    </p>

                    {/* Decorative Element */}
                    <div className="mt-16 animate-bounce">
                        <span className="text-accent text-sm tracking-widest uppercase">Descubre Nuestro Camino</span>
                        <div className="w-px h-12 bg-accent mx-auto mt-4"></div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                {/* Timeline */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12 text-dark">Nuestro Camino</h2>
                    <div className="relative container mx-auto px-4 flex flex-col space-y-8">
                        {/* Central Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-accent transform md:-translate-x-1/2"></div>

                        {[
                            { year: '2019', title: 'Fundación de Grupo Llantero Noguez', desc: 'Iniciamos operaciones con nuestra primera sucursal ubicada en la Pradera en el mes de Marzo, sentando las bases de nuestro servicio y compromiso con los clientes.' },
                            { year: '2020', title: 'Expansión Regional', desc: 'Gracias a la confianza de nuestros clientes, abrimos nuestra segunda sucursal en Av. del Parque para atender la creciente demanda en la zona.' },
                            { year: '2023', title: 'Expansión Regional', desc: 'Continuamos nuestra expansión con la apertura de la sucursal Corregidora, fortaleciendo nuestra presencia en la región.' },
                            { year: '2024', title: 'Expansión Regional', desc: 'Este año marcó un paso importante con la apertura de dos nuevas sucursales: Plateros y Conín, ampliando significativamente nuestra cobertura.' },
                            { year: '2025', title: 'Innovación Digital', desc: 'Implementamos nuestro sistema web para optimizar procesos internos y brindar una atención más ágil y eficiente a nuestros clientes.' },
                            { year: '2025', title: 'Expansión Regional', desc: 'Sumamos la sucursal Miranda a nuestra red, reafirmando nuestro compromiso de estar cada vez más cerca de nuestros clientes.' },
                        ].map((item, index) => (
                            <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                {/* Spacer for Desktop */}
                                <div className="hidden md:block w-1/2"></div>

                                {/* Dot */}
                                <div className="absolute left-4 md:left-1/2 w-6 h-6 bg-accent rounded-full border-4 border-white shadow-md transform -translate-x-1/2 z-10"></div>

                                {/* Content Card */}
                                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                        <span className="text-accent font-bold text-xl block mb-2">{item.year}</span>
                                        <h3 className="text-lg font-bold text-dark mb-2">{item.title}</h3>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-primary text-white p-10 rounded-lg shadow-xl">
                        <Target className="mb-4 text-accent" size={48} />
                        <h2 className="text-2xl font-bold mb-4 !text-white">Misión</h2>
                        <p className="text-lg leading-relaxed">
                            Brindamos soluciones integrales en llantas, rines, refacciones y servicios mecanicos especializados, con precision, rapidez y confianza. Nos impulsa la pasión por los autos y el compromiso de mantener seguros a nuestros clientes, a traves de un equipo en constante capacitación.
                        </p>
                    </div>
                    <div className="bg-white p-10 rounded-lg shadow-xl border-t-4 border-accent">
                        <Award className="mb-4 text-primary" size={48} />
                        <h2 className="text-2xl font-bold mb-4 text-dark">Visión</h2>
                        <p className="text-lg leading-relaxed text-gray-600">
                            Ser el grupo llantero lider e innovador del estado con expansion en todo el país, ser reconocidos por nuestra excelencia, trato humano y mejora continua.
                        </p>
                    </div>
                </div>

                {/* Values */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12 text-dark">Nuestros Valores</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Confianza', desc: 'La confianza es esencial en Grupo Llantero Noguez porque cada producto y servicio impacta directamente en la seguridad de los conductores. Por ello, brindan atención honesta y soluciones de calidad que ofrecen tranquilidad y respaldo a cada cliente.' },
                            { title: 'Compromiso', desc: 'Refleja en la dedicación diaria por ofrecer un servicio responsable y de calidad. Trabajan con constancia para cumplir las necesidades de cada cliente y brindar soluciones confiables en todo momento.' },
                            { title: 'Perseverancia', desc: 'Impulsa el crecimiento continuo y la mejora constante en cada servicio. Gracias a este valor, superan retos diarios para seguir ofreciendo calidad y atención cercana a sus clientes.' },
                        ].map((value, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-primary">
                                <h3 className="text-xl font-bold text-primary mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team */}
                <div>
                    <h2 className="text-3xl font-bold text-center mb-12 text-dark">Conoce al Equipo</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {loading ? (
                            <p>Cargando equipo...</p>
                        ) : error ? (
                            <p className="text-red-500">Error: {error}</p>
                        ) : team.length > 0 ? (
                            team.map((member, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                                    <img src={member.icon_url} alt={member.nombre} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100" />
                                    <h3 className="text-xl font-bold text-dark">{member.nombre}</h3>
                                    <p className="text-accent font-medium">{member.puesto}</p>
                                </div>
                            ))
                        ) : (
                            <p>No se encontró información del equipo.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
