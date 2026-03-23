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
        { type: 'hero', id: 0 },
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
                <div className="flex flex-col lg:flex-row gap-2">
                    {/* Left Column - Side Promotions (Integrated design) */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-2 order-2 lg:order-1 h-[500px] lg:h-[750px]">
                        {/* Promo 1 - Integrated design style */}
                        <div className="relative h-1/2 rounded-2xl overflow-hidden group bg-accent shadow-xl border border-white/5">
                            <img
                                src="/images/general/promo_1.webp"
                                alt="Promoción 1"
                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>

                        {/* Promo 2 - Integrated design style */}
                        <div className="relative h-1/2 rounded-2xl overflow-hidden group bg-primary shadow-xl border border-white/5">
                            <img
                                src="/images/general/promo_5.webp"
                                alt="Cambio de Aceite"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Main Carousel */}
                    <div className="w-full lg:w-2/3 order-1 lg:order-2 h-[500px] lg:h-[750px]">
                        {/* Hero Section Carousel */}
                        <div className="relative bg-primary text-white rounded-2xl overflow-hidden h-full flex items-center group/home shadow-2xl border border-white/5">
                            {/* Carousel Slides */}
                            {slides.map((slide, index) => (
                                <div
                                    key={slide.id}
                                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${currentSlide === index
                                        ? 'opacity-100 z-10 scale-100 translate-y-0'
                                        : index < currentSlide
                                            ? 'opacity-0 z-0 scale-110 -translate-y-full'
                                            : 'opacity-0 z-0 scale-105 translate-y-0'
                                        }`}
                                >
                                    {slide.type === 'hero' ? (
                                        <div className="h-full relative flex items-center py-10">
                                            {/* Background Image with Overlay */}
                                            <div className="absolute inset-0">
                                                <img
                                                    src="/images/general/header.webp"
                                                    alt="Background"
                                                    className="w-full h-full object-cover opacity-60 transition-transform duration-[8000ms] ease-linear"
                                                    style={{
                                                        transform: currentSlide === index ? 'scale(1.2)' : 'scale(1)'
                                                    }}
                                                    fetchPriority="high"
                                                    width="1920"
                                                    height="1080"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/50 to-transparent"></div>
                                            </div>

                                            <div className="container mx-auto px-8 relative z-10">
                                                <div className="max-w-xl">
                                                    {/* Badge */}
                                                    <div className="flex items-center space-x-2 text-[var(--color-highlight)] font-bold tracking-wider mb-2">
                                                        <Shield size={16} className="text-[var(--color-highlight)]" />
                                                        <span className="text-xs uppercase">Más de 6 años de experiencia</span>
                                                    </div>

                                                    {/* Main Title */}
                                                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 text-white">
                                                        Tu Seguridad <br />
                                                        <span className="text-[var(--color-highlight)]">Rueda con Nosotros</span>
                                                    </h1>

                                                    {/* Description */}
                                                    <p className="text-base text-gray-200 mb-8 max-w-md leading-relaxed">
                                                        Expertos en llantas y servicios automotrices con personal capacitado.
                                                    </p>

                                                    {/* Buttons */}
                                                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                                        <a href="/contacto" className="bg-accent hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-bold flex items-center justify-center transition-colors text-sm">
                                                            Cotizar <span className="ml-2">→</span>
                                                        </a>
                                                        <a href="/productos" className="bg-white hover:bg-gray-100 text-primary px-6 py-2.5 rounded-lg font-bold flex items-center justify-center transition-colors text-sm">
                                                            Productos
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
                                            {/* Blurred Background Layer */}
                                            <div
                                                className="absolute inset-0 z-0 bg-cover bg-center scale-125 blur-xl opacity-40 transition-transform duration-[2000ms] ease-out"
                                                style={{
                                                    backgroundImage: `url(${slide.image})`,
                                                    transform: currentSlide === index ? 'scale(1.1) rotate(0deg)' : 'scale(1.3) rotate(2deg)'
                                                }}
                                            />

                                            {/* Main Image Link */}
                                            <a href={slide.link} className="relative z-10 block w-full h-full cursor-pointer flex items-center justify-center">
                                                <img
                                                    src={slide.image}
                                                    alt={`Promoción ${index}`}
                                                    className="max-w-full max-h-full w-auto h-full object-contain drop-shadow-2xl transition-transform duration-[8000ms] ease-linear"
                                                    style={{
                                                        transform: currentSlide === index ? 'scale(1.1)' : 'scale(1)',
                                                        opacity: currentSlide === index ? 1 : 0.5
                                                    }}
                                                />
                                                {/* Gradient overlay for text/dot visibility */}
                                                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Carousel Controls */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-black/10 hover:bg-primary/80 text-white transition-all duration-300 hidden md:flex flex-col justify-center items-center opacity-0 group-hover/home:opacity-100 hover:opacity-100"
                                aria-label="Anterior"
                            >
                                <ChevronLeft size={32} className="opacity-70" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-black/10 hover:bg-primary/80 text-white transition-all duration-300 hidden md:flex flex-col justify-center items-center opacity-0 group-hover/home:opacity-100 hover:opacity-100"
                                aria-label="Siguiente"
                            >
                                <ChevronRight size={32} className="opacity-70" />
                            </button>

                            {/* Carousel Indicators */}

                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`transition-all duration-300 rounded-full ${currentSlide === index
                                            ? 'bg-accent w-6 h-2'
                                            : 'bg-white/50 hover:bg-white/80 w-2 h-2'
                                            }`}
                                        aria-label={`Ir a la diapositiva ${index + 1}`}
                                    />
                                ))}
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
