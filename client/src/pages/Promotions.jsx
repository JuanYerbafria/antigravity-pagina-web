import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Zap, Heart, ChevronLeft, ChevronRight, Shield, Clock, Wrench, Calendar, Star, Tag, Percent, Gift, MapPin } from 'lucide-react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';

const Promotions = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeFilter, setActiveFilter] = useState('Llantas');
    const [loading, setLoading] = useState(true);

    const filters = [
        { key: 'Llantas', label: 'LLANTAS' },
        { key: 'Rines', label: 'RINES' },
        { key: 'Baterías', label: 'BATERÍAS' },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch from the specialized promotions endpoint
                const response = await api.get('/products/promotions');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching promotion products:', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (products.length === 0) return;

        const filtered = products.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()));
        setFilteredProducts(filtered);
    }, [activeFilter, products]);

    // Scrollable products
    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollContainerRef = React.useRef(null);

    const scrollProducts = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 350; // Increased to match card width + gap
            const newPosition = direction === 'left'
                ? scrollPosition - scrollAmount
                : scrollPosition + scrollAmount;
            scrollContainerRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
            setScrollPosition(newPosition);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans">
            <Helmet>
                <title>Promociones | Grupo Llantero Noguez</title>
                <meta name="description" content="Descubre las mejores ofertas en llantas, rines y baterías. Descuentos exclusivos y promociones 4x3 en Grupo Llantero Noguez, Querétaro." />
                <meta property="og:title" content="Promociones | Grupo Llantero Noguez" />
                <meta property="og:description" content="Las mejores ofertas y descuentos en llantas, rines y baterías en Querétaro." />
            </Helmet>

            {/* ==================== HERO SECTION ==================== */}
            <section className="relative overflow-hidden" style={{ minHeight: '600px' }}>
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/general/promo_hero_bg.webp"
                        alt="Promociones"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                </div>

                {/* Decorative glow */}
                <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] z-0"></div>

                <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32 flex items-center" style={{ minHeight: '600px' }}>
                    <div className="max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
                            <Zap size={14} className="animate-pulse" />
                            <span className="text-xs font-bold tracking-widest uppercase">Solo por tiempo limitado</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.05] mb-6 uppercase tracking-tight">
                            Oferta Eléctrica:{' '}
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] via-[#FF4500] to-accent" style={{ WebkitBackgroundClip: 'text' }}>
                                Llantas & Rines
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-gray-200 text-base lg:text-lg mb-10 leading-relaxed max-w-lg drop-shadow-md">
                            Equipa tu vehículo con la mejor tecnología en neumáticos y rines de aleación. Rendimiento puro para la carretera.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">

                            <Link
                                to="/servicios"
                                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all border border-white/20 backdrop-blur-sm text-sm tracking-wide uppercase"
                            >
                                Ver Servicios
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== FILTER TABS ==================== */}
            <section className="border-b border-gray-100 bg-white sticky top-20 z-40">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-1 overflow-x-auto py-4 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
                        <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mr-4 whitespace-nowrap hidden md:block">Filtrar por:</span>
                        {filters.map((filter) => (
                            <button
                                key={filter.key}
                                onClick={() => setActiveFilter(filter.key)}
                                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                                    activeFilter === filter.key
                                        ? 'bg-accent text-white shadow-lg shadow-red-600/20'
                                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-primary border border-gray-200'
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== PRODUCTS SECTION ==================== */}
            <section className="py-16 lg:py-24 bg-gray-50/50">
                <div className="container mx-auto px-4">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-2 uppercase tracking-tight italic">
                                Descuentos en <span className="text-accent">Equipamiento</span>
                            </h2>
                            <p className="text-gray-500 text-sm">Stock limitado. Alta demanda.</p>
                        </div>

                    </div>

                    {/* Products Grid / Scroll */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="relative">
                            {/* Scroll Arrows - Desktop */}
                            <button
                                onClick={() => scrollProducts('left')}
                                className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white hover:bg-accent text-primary hover:text-white rounded-full items-center justify-center transition-all shadow-lg border border-gray-100"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => scrollProducts('right')}
                                className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white hover:bg-accent text-primary hover:text-white rounded-full items-center justify-center transition-all shadow-lg border border-gray-100"
                            >
                                <ChevronRight size={20} />
                            </button>

                            <div
                                ref={scrollContainerRef}
                                className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory px-4 lg:-mx-4"
                                style={{ scrollbarWidth: 'none' }}
                            >
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex-shrink-0 w-[300px] lg:w-[320px] snap-start"
                                    >
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-400 font-bold tracking-widest text-xs uppercase">No hay productos disponibles en esta categoría.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ==================== BOTTOM CARDS SECTION ==================== */}
            <section className="pb-24 lg:pb-32 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* Service Center Card - Larger */}
                        <div className="lg:col-span-3 relative rounded-2xl overflow-hidden group shadow-xl" style={{ minHeight: '380px' }}>
                            <div className="absolute inset-0">
                                <img
                                    src="/images/general/service_center.webp"
                                    alt="Centro de Servicio"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
                            </div>
                            <div className="relative z-10 p-10 lg:p-14 flex flex-col justify-end h-full">
                                <h3 className="text-3xl lg:text-4xl font-black text-white uppercase italic mb-4 leading-tight">
                                    Centro de<br />Servicio Elite
                                </h3>
                                <p className="text-gray-200 text-sm mb-6 max-w-sm leading-relaxed drop-shadow-sm">
                                    Desde la alineación y balanceo hasta cambio de aceite sintético. Tu vehículo en manos de expertos.
                                </p>
                                <Link
                                    to="/contacto"
                                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-accent text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all duration-300 border border-white/20 hover:border-accent self-start backdrop-blur-sm"
                                >
                                    <Calendar size={16} />
                                    Agendar Cita
                                </Link>
                            </div>
                        </div>

                        {/* Performance Club Card - Smaller */}
                        <div className="lg:col-span-2 bg-gradient-to-br from-accent via-red-600 to-red-800 rounded-2xl overflow-hidden relative group shadow-xl" style={{ minHeight: '380px' }}>
                            {/* Decorative pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 right-0 w-64 h-64 border border-white/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 border border-white/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                            </div>

                            <div className="relative z-10 p-10 lg:p-14 flex flex-col justify-between h-full">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-white/20 text-white px-3 py-1 rounded-full mb-6 text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm">
                                        <MapPin size={12} fill="currentColor" />
                                        Querétaro
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-black text-white uppercase italic mb-4 leading-tight">
                                        Visítanos en Nuestras<br />5 Sucursales
                                    </h3>
                                </div>
                                <div>
                                    <p className="text-white/80 text-sm mb-8 leading-relaxed">
                                        Estamos cerca de ti con el mejor servicio y especialistas listos para atenderte. Encuentra la ubicación más cercana.
                                    </p>
                                    <Link
                                        to="/sucursales"
                                        className="inline-flex items-center gap-2 bg-white text-accent px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-gray-100 hover:scale-105 shadow-xl"
                                    >
                                        Cómo llegar
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Promotions;
