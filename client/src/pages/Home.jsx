import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, Star, Shield, Award, Wrench, ChevronLeft, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import TireSearch from '../components/TireSearch';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { type: 'image', id: 1, image: '/images/general/promo_1.webp', link: '/productos' },
        { type: 'image', id: 2, image: '/images/general/promo_2.webp', link: '/productos' },
        { type: 'image', id: 3, image: '/images/general/promo_3.webp', link: '/productos' },
        { type: 'image', id: 4, image: '/images/general/promo_4.webp', link: '/productos' },
        { type: 'image', id: 5, image: '/images/general/promo_5.webp', link: '/productos' },
    ];

    useEffect(() => {
        // Fetch featured products
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products?featured=true');
                setFeaturedProducts(response.data);
            } catch (error) {
                console.error('Error fetching featured products:', error);
            }
        };

        fetchProducts();
    }, []);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div>
            <Helmet>
                <title>Grupo Llantero Noguez | Llantas 4x3 y 25% de Descuento</title>
                <meta name="description" content="Aprovecha promoción 4x3 y 25% de descuento en llantas, rines y servicios automotrices en Querétaro. Expertos con más de 6 años de experiencia." />
                <meta property="og:title" content="Grupo Llantero Noguez | Llantas 4x3 y 25% de Descuento" />
                <meta property="og:description" content="Venta de llantas, rines y servicios automotrices en Querétaro. ¡Las mejores promociones aquí!" />
            </Helmet>

            <div className="w-full px-2 py-2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group/hero h-auto lg:h-[750px] bg-black">
                    {/* Common Background for the entire section - Balanced Darkness */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/images/general/header.webp"
                            alt="Background"
                            className="w-full h-full object-cover opacity-45 shadow-inner"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/40 to-transparent"></div>
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row h-full">
                        {/* Left Side: Static Hero Text (shifted to 40%) */}
                        <div className="w-full lg:w-[45%] flex items-center p-8 lg:p-16 lg:pr-4 order-2 lg:order-1">
                            <div className="w-full">
                                <div className="flex items-center space-x-2 text-[var(--color-highlight)] font-bold tracking-wider mb-4">
                                    <Shield size={20} className="text-[var(--color-highlight)]" />
                                    <span className="text-xs uppercase">Más de 6 años de experiencia</span>
                                </div>

                                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-lg">
                                    Tu Seguridad <br />
                                    <span className="text-[var(--color-highlight)]">Rueda con Nosotros</span>
                                </h1>

                                <p className="text-base text-gray-200 mb-8 leading-relaxed max-w-lg drop-shadow-sm">
                                    Expertos en llantas, rines y servicios automotrices. Equipos actualizados para un mejor servicio y personal capacitado para cuidar de tu vehículo.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                    <a href="/contacto" className="bg-accent hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold flex items-center justify-center transition-all hover:scale-105 shadow-xl text-base">
                                        Solicitar Cotización <span className="ml-2">→</span>
                                    </a>
                                    <a href="/productos" className="bg-white/90 hover:bg-white text-primary px-8 py-3 rounded-lg font-bold flex items-center justify-center transition-all hover:scale-105 shadow-xl text-base">
                                        Ver Productos
                                    </a>
                                </div>

                                {/* Features Row - Restored full version */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10 mt-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm shadow-inner group/icon shrink-0">
                                            <Award size={22} className="text-accent group-hover/icon:scale-110 transition-transform" />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm">Técnicos Capacitados</div>
                                            <div className="text-gray-400 text-xs">Profesionales expertos</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm shadow-inner group/icon shrink-0">
                                            <Shield size={22} className="text-accent group-hover/icon:scale-110 transition-transform" />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm">Garantía Total</div>
                                            <div className="text-gray-400 text-xs">100% satisfacción</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm shadow-inner group/icon shrink-0">
                                            <Wrench size={22} className="text-accent group-hover/icon:scale-110 transition-transform" />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm leading-tight mb-1">Equipos modernos y precisos</div>
                                            <div className="text-gray-400 text-xs leading-normal">Herramientas que elevan la calidad del servicio</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Carousel (Rebalanced position) */}
                        <div className="w-full lg:w-[60%] h-[500px] lg:h-full order-1 lg:order-2 p-4 lg:py-0 lg:px-12">
                            <div className="relative w-full h-full perspective-[1500px] flex items-center justify-center">
                                {/* Carousel Slides Container */}
                                <div className="relative w-full h-full preserve-3d">
                                    {slides.map((slide, index) => {
                                        const total = slides.length;
                                        const activeIndex = currentSlide % total;
                                        
                                        let offset = index - activeIndex;
                                        if (offset > total / 2) offset -= total;
                                        if (offset < -total / 2) offset += total;

                                        const isActive = offset === 0;

                                        let transformStyle = "";
                                        let zIndex = 0;
                                        let opacity = 0;

                                        if (isActive) {
                                            transformStyle = "translateX(0) scale(1) translateZ(0) rotateY(0)";
                                            zIndex = 30;
                                            opacity = 1;
                                        } else if (offset === 1) {
                                            transformStyle = "translateX(35%) scale(0.8) translateZ(-150px) rotateY(-15deg)";
                                            zIndex = 20;
                                            opacity = 0.5;
                                        } else if (offset === -1) {
                                            transformStyle = "translateX(-35%) scale(0.8) translateZ(-150px) rotateY(15deg)";
                                            zIndex = 20;
                                            opacity = 0.5;
                                        } else {
                                            transformStyle = offset > 0 
                                                ? "translateX(70%) scale(0.6) translateZ(-300px)" 
                                                : "translateX(-70%) scale(0.6) translateZ(-300px)";
                                            zIndex = 10;
                                            opacity = 0;
                                        }

                                        return (
                                            <div
                                                key={slide.id}
                                                className="absolute inset-0 h-full transition-all duration-700 ease-out transform-gpu"
                                                style={{
                                                    transform: transformStyle,
                                                    zIndex: zIndex,
                                                    opacity: opacity,
                                                    pointerEvents: isActive ? 'auto' : 'none',
                                                    backfaceVisibility: 'hidden',
                                                }}
                                            >
                                                <div className={`w-full h-full relative overflow-hidden transition-all duration-700 rounded-3xl ${isActive
                                                    ? 'bg-black/20 border border-white/10 active-card-glow shadow-2xl'
                                                    : 'bg-transparent border-none'
                                                    }`}>
                                                    <a href={slide.link} className="relative z-10 w-full h-full p-4 flex items-center justify-center">
                                                        <img
                                                            src={slide.image}
                                                            alt={`Promoción ${index}`}
                                                            className={`max-w-full max-h-full w-auto h-auto object-contain transition-all duration-700 ${isActive
                                                                ? 'drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-100'
                                                                : 'drop-shadow-lg scale-90'
                                                                }`}
                                                        />
                                                    </a>
                                                    {/* Top/Bottom accents - only for active */}
                                                    <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                                                    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Modern Controls for 3D Carousel */}
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-[-20px] lg:left-0 z-[50] w-12 h-12 bg-white/10 hover:bg-accent backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg border border-white/10"
                                    aria-label="Anterior"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-[-20px] lg:right-0 z-[50] w-12 h-12 bg-white/10 hover:bg-accent backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg border border-white/10"
                                    aria-label="Siguiente"
                                >
                                    <ChevronRight size={24} />
                                </button>

                                {/* Responsive Indicators (Dots) */}
                                <div className="absolute bottom-4 lg:bottom-10 left-1/2 -translate-x-1/2 z-[50] flex space-x-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
                                    {slides.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`transition-all duration-300 rounded-full ${currentSlide % slides.length === index
                                                ? 'bg-accent w-8 h-2'
                                                : 'bg-white/40 hover:bg-white/70 w-2 h-2'
                                            }`}
                                            aria-label={`Ir a la diapositiva ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* Tire Search Section */}
            <TireSearch />

            {/* Featured Products */}
            <section className="py-16 container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Productos Destacados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.length > 0 ? (
                        featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p className="text-center col-span-4 text-gray-500">Cargando productos destacados...</p>
                    )}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Técnicos Certificados', desc: 'Personal capacitado para cuidar tu auto.' },
                            { title: 'Garantía de Satisfacción', desc: 'Respaldamos cada producto y servicio que ofrecemos.' },
                            { title: 'Equipos actualizados', desc: 'Equipos modernos para diagnósticos precisos.' },
                            { title: 'Las Mejores Marcas', desc: 'Trabajamos con los líderes del mercado global.' },
                            { title: '+6 Años de Experiencia', desc: 'Trayectoria comprobada en el sector automotriz.' },
                            { title: '5 Sucursales', desc: 'Siempre cerca de ti para brindarte el mejor servicio.' },
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex items-start">
                                <CheckCircle className="text-accent mr-4 flex-shrink-0" size={24} />
                                <div>
                                    <h3 className="font-bold text-lg mb-2 text-primary">{item.title}</h3>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { name: 'Angel Hurtado', comment: 'Me fui muy satisfecho con el servicio. Los empleados fueron muy amables y me ayudaron a encontrar las llantas que necesitaba para mi coche. Los precios fueron razonables y el proceso de los chavos fue rápido. Definitivamente recomiendo este lugar 👍' },
                        { name: 'Cesar Arreola Del Pozo', comment: 'Excelente servicio, precios muy accesibles y de muy buena calidad.' },
                        { name: 'Jaqueline avendaño', comment: 'excelente lugar!! quedé muy satisfecha por el servicio, 100% recomendado' },
                    ].map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                            <div className="flex text-yellow-400 mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                            </div>
                            <p className="text-gray-600 mb-6 italic">"{testimonial.comment}"</p>
                            <div className="font-bold text-primary">- {testimonial.name}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Brands Carousel */}
            <section className="py-10 bg-white border-t border-gray-100 overflow-hidden">
                <div className="container mx-auto px-4 mb-8">
                    <h2 className="text-2xl font-bold text-center text-gray-400 tracking-widest">Marcas que manejamos</h2>
                </div>

                <div className="relative w-full overflow-hidden">
                    <div className="flex animate-scroll w-max">
                        {/* First set of logos */}
                        <div className="flex space-x-12 px-6">
                            {[
                                { name: 'Hankook', src: '/images/general/Hankook.webp' },
                                { name: 'Pirelli', src: '/images/general/pirelli.webp' },
                                { name: 'Michelin', src: '/images/general/michelin_tire.webp' },
                                { name: 'Kumho', src: '/images/general/kumho_tire.webp' },
                                { name: 'Bridgestone', src: '/images/general/Bridgestone.webp' },
                                { name: 'Tornel', src: '/images/general/tornel.webp' },
                                { name: 'Continental', src: '/images/general/continental.webp' },
                                { name: 'Cooper', src: '/images/general/cooper.webp' },
                                { name: 'Mirage', src: '/images/general/Mirage.webp' },
                                { name: 'Blackhawk', src: '/images/general/black.webp' },
                                { name: 'Toyo', src: '/images/general/toyo.webp' },
                                { name: 'Bf Goodrich', src: '/images/general/bf_goodrich.webp' },
                                { name: 'Yokohama', src: '/images/general/yoko.webp' },
                                { name: 'Dunlop', src: '/images/general/dunlop.webp' },
                                { name: 'Euzkadi', src: '/images/general/euzcadi.webp' },
                                { name: 'Firestone', src: '/images/general/firestone.webp' },
                                { name: 'Goodride', src: '/images/general/goodride.webp' },
                                { name: 'Goodyear', src: '/images/general/goodyear.webp' },
                                { name: 'Jktires', src: '/images/general/jktire.webp' },
                                { name: 'Laufen', src: '/images/general/laufen.webp' },
                                { name: 'Maxtrek', src: '/images/general/maxtrickpng.webp' },
                                { name: 'Maxxis', src: '/images/general/maxxis.webp' },
                                { name: 'Mazzini', src: '/images/general/mazzini.webp' },
                                { name: 'Uniroyal', src: '/images/general/uni.webp' },
                                { name: 'Wanli', src: '/images/general/wanli.webp' },
                                { name: 'Winrun', src: '/images/general/win.webp' }
                            ].map((brand, index) => (
                                <div key={`brand-1-${index}`} className="flex items-center justify-center w-32 h-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                    <img
                                        src={brand.src || `https://placehold.co/150x80/white/333?text=${brand.name}`}
                                        alt={brand.name}
                                        className="max-w-full max-h-full object-contain"
                                        width="128"
                                        height="80"
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Duplicate set for seamless scrolling */}
                        <div className="flex space-x-12 px-6">
                            {[
                                { name: 'Hankook', src: '/images/general/Hankook.webp' },
                                { name: 'Pirelli', src: '/images/general/pirelli.webp' },
                                { name: 'Michelin', src: '/images/general/michelin_tire.webp' },
                                { name: 'Kumho', src: '/images/general/kumho_tire.webp' },
                                { name: 'Bridgestone', src: '/images/general/Bridgestone.webp' },
                                { name: 'Tornel', src: '/images/general/tornel.webp' },
                                { name: 'Sportrack', src: null },
                                { name: 'Davanti', src: null },
                                { name: 'Mirage', src: '/images/general/Mirage.webp' },
                                { name: 'Blackhawk', src: '/images/general/black.webp' },
                                { name: 'Toyo', src: '/images/general/toyo.webp' },
                                { name: 'Nereus', src: null },
                                { name: 'Yokohama', src: '/images/general/yoko.webp' }
                            ].map((brand, index) => (
                                <div key={`brand-2-${index}`} className="flex items-center justify-center w-32 h-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                    <img
                                        src={brand.src || `https://placehold.co/150x80/white/333?text=${brand.name}`}
                                        alt={brand.name}
                                        className="max-w-full max-h-full object-contain"
                                        width="128"
                                        height="80"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
