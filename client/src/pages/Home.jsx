import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, Star, Shield, Award, Wrench, ChevronLeft, ChevronRight, Youtube, Instagram, Facebook, Zap, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import TireSearch from '../components/TireSearch';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [selectedSocial, setSelectedSocial] = useState('tiktok');

    const socialData = {
        youtube: {
            name: 'YouTube',
            handle: '@llanterasnoguez3686',
            url: 'https://www.youtube.com/@llanterasnoguez3686/shorts',
            embedUrl: 'https://www.youtube.com/embed/videoseries?list=UU57tX9vmE9PiS-ngXlsWcnQ&autoplay=0',
            icon: <Youtube size={26} />,
            color: 'red'
        },
        instagram: {
            name: 'Instagram',
            handle: '@grupo_llantero_noguez',
            url: 'https://www.instagram.com/grupo_llantero_noguez/?igsh=NXc5dTM3M29haHVn&utm_source=qr#',
            embedUrl: 'https://www.instagram.com/grupo_llantero_noguez/',
            icon: <Instagram size={26} />,
            color: 'pink'
        },
        facebook: {
            name: 'Facebook',
            handle: '@gruponoguez',
            url: 'https://www.facebook.com/gruponoguez/',
            embedUrl: 'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fgruponoguez%2F&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId',
            icon: <Facebook size={26} />,
            color: 'blue'
        },
        tiktok: {
            name: 'TikTok',
            handle: '@grupo.llantero.noguez',
            url: 'https://www.tiktok.com/@grupo.llantero.noguez',
            embedUrl: 'https://www.tiktok.com/embed/@grupo.llantero.noguez',
            icon: <Zap size={26} />,
            color: 'black'
        }
    };


    const slides = [
        { type: 'image', id: 1, image: '/images/general/promo_11.webp', link: '/productos' },
        { type: 'image', id: 2, image: '/images/general/promo_22.webp', link: '/productos' },
        { type: 'image', id: 3, image: '/images/general/promo_33.webp', link: '/productos' },
        { type: 'image', id: 4, image: '/images/general/promo_44.webp', link: '/productos' },
        { type: 'image', id: 5, image: '/images/general/promo_55.webp', link: '/productos' },
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

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await api.get('/reviews');
                if (response.data.success) {
                    setReviews(response.data.reviews);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setLoadingReviews(false);
            }
        };
        fetchReviews();
    }, []);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const staticReviews = [
        {
            name: 'Angel Hurtado',
            comment: 'Me fui muy satisfecho con el servicio. Los empleados fueron muy amables y me ayudaron a encontrar las llantas que necesitaba para mi coche. Los precios fueron razonables y el proceso de los chavos fue rápido. Definitivamente recomiendo este lugar 👍',
            time: 'Hace 7 meses',
            photo: 'https://lh3.googleusercontent.com/a-/ALV-EMidZ7L7R7_XwG4r5n5I0_8-6_G5V-Q0-vVv-Vv-Vv-Vv-Vv=s120-c-rp-mo-br100',
            rating: 5
        },
        {
            name: 'Liliana Marsella Rua Rodriguez',
            comment: 'Recomiendo mucho la atención en este lugar, me parecieron precios justos.',
            time: 'Hace 3 meses',
            photo: 'https://lh3.googleusercontent.com/a-/ALV-UjVRSlL0z3NW4dX8p49RWRPMohZbWGOknOLYUnvAfoXsz2XR-tEZ1A=s120-c-rp-mo-ba3-br100',
            rating: 5
        },
        {
            name: 'Victor Portela',
            comment: 'Excelente trato, muy profesionales.',
            time: 'Hace 6 meses',
            photo: 'https://lh3.googleusercontent.com/a-/ALV-UjXxajxqhywVmNlcYHtFdlZ7qE8OF6Q2qMbfqxGyXTQXxlYuMH3-ug=s120-c-rp-mo-ba3-br100',
            rating: 5
        },
        {
            name: 'Ricardo Gutierrez Vera',
            comment: 'Excelente servicio y atención al cliente de la señorita Dana.',
            time: 'Hace 7 meses',
            photo: 'https://lh3.googleusercontent.com/a-/ALV-UjV0tuy5VA4cIE1FNC-hUHlJMPMyAADAF7nKZ07MbFCSV7yOi30eGA=s120-c-rp-mo-br100',
            rating: 5
        },
        {
            name: 'Cesar Arreola Del Pozo',
            comment: 'Excelente servicio, precios muy accesibles y de muy buena calidad.',
            time: 'Hace 8 meses',
            photo: 'https://lh3.googleusercontent.com/a-/ALV-UjUL427ywfUDbAgs-2FL0fkl_4BH3AWXI6oF8Ss8tE5fSB_Xc0JY=s120-c-rp-mo-ba2-br100',
            rating: 5
        },
        {
            name: 'Steve Jaralillo',
            comment: 'Excelente atención, precios mejor que la competencia, y te dicen la mejor recomendación. Todo muy bien.',
            time: 'Hace 3 años',
            photo: 'https://lh3.googleusercontent.com/a/ACg8ocKKjNLcltG9n2WPbaTlM1m0eNjkDe_vSsG7lie9wLon9lcYeg=s120-c-rp-mo-ba4-br100',
            rating: 4
        },
        {
            name: 'Eru CB',
            comment: 'Cumplieron con el tiempo de servicio que habían pautado.',
            time: 'Hace 7 meses',
            photo: 'https://lh3.googleusercontent.com/a/ACg8ocJ5zVdZ4TDjRKcTXTzf0AzNN3Xr06XHinqa4CA3AFbD-GkQgw=s120-c-rp-mo-br100',
            rating: 5
        },
        {
            name: 'Javier Brito',
            comment: 'Excelente atención y servicio. Muy profesionales en todo momento. Recomendado.',
            time: 'Hace 3 meses',
            photo: 'https://lh3.googleusercontent.com/a-/ALV-UjW0O2NXmCcvkZfu143I9YjGnIB33bkf-73zgSUhylEvH_GljVGq=s120-c-rp-mo-br100',
            rating: 5
        },
    ];

    const displayReviews = reviews.length > 0 ? reviews : staticReviews;
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [currentReview, setCurrentReview] = useState(0);
    const reviewsPerPage = isMobile ? 1 : 3;

    const nextReview = () => {
        if (currentReview >= displayReviews.length) {
            setIsTransitioning(false);
            setCurrentReview(0);
            setTimeout(() => {
                setIsTransitioning(true);
                setCurrentReview(1);
            }, 20);
        } else {
            setCurrentReview((prev) => prev + 1);
        }
    };

    const prevReview = () => {
        if (currentReview <= 0) {
            setIsTransitioning(false);
            setCurrentReview(displayReviews.length);
            setTimeout(() => {
                setIsTransitioning(true);
                setCurrentReview(displayReviews.length - 1);
            }, 20);
        } else {
            setCurrentReview((prev) => prev - 1);
        }
    };

    // Auto-advance testimonials
    useEffect(() => {
        const timer = setInterval(() => {
            nextReview();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentReview, isMobile, displayReviews.length]);

    // Handle the "instant jump" logic for infinite loop
    useEffect(() => {
        if (currentReview === displayReviews.length) {
            const timer = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentReview(0);
            }, 700); // Wait for transition duration
            return () => clearTimeout(timer);
        }
    }, [currentReview, displayReviews.length]);

    useEffect(() => {
        if (!isTransitioning && currentReview === 0) {
            const timer = setTimeout(() => {
                setIsTransitioning(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning, currentReview]);

    // Helper to render stars
    const renderStars = (rating) => {
        return (
            <div className="flex text-yellow-500 mb-2">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={16}
                        fill={i < Math.round(rating) ? "currentColor" : "none"}
                        className={i < Math.round(rating) ? "" : "text-gray-300"}
                    />
                ))}
            </div>
        );
    };


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
                <div className="text-center mb-12 flex flex-col items-center">
                    <div className="inline-block px-4 py-1.5 mb-2 text-xs font-bold tracking-widest text-accent uppercase bg-red-50 rounded-full border border-accent/10">
                        Catálogo
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-black text-primary drop-shadow-sm mb-4">
                        Productos <span className="text-accent">destacados</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-accent rounded-full"></div>
                </div>
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
                    <div className="text-center mb-12 flex flex-col items-center">
                        <div className="inline-block px-4 py-1.5 mb-2 text-xs font-bold tracking-widest text-accent uppercase bg-red-50 rounded-full border border-accent/10">
                            Ventajas
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black text-primary drop-shadow-sm mb-4">
                            ¿Por qué <span className="text-accent">elegirnos?</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-accent rounded-full"></div>
                    </div>
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
            <section className="py-24 bg-gray-50 border-y border-gray-100 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 relative">
                        <div className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-[var(--color-accent)] uppercase bg-red-50 rounded-full border border-[var(--color-accent)]/10">
                            Testimonios
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black text-primary drop-shadow-sm mb-4">
                            Lo que dicen <span className="text-[var(--color-accent)]">nuestros clientes</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-[var(--color-accent)] mx-auto rounded-full"></div>

                        {/* Navigation Buttons (Desktop) */}
                        {!isMobile && (
                            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none">
                                <button
                                    onClick={prevReview}
                                    className="pointer-events-auto -ml-4 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-primary hover:bg-[var(--color-accent)] hover:text-white transition-all transform hover:scale-110 active:scale-95 z-40"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextReview}
                                    className="pointer-events-auto -mr-4 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-primary hover:bg-[var(--color-accent)] hover:text-white transition-all transform hover:scale-110 active:scale-95 z-40"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <div
                            className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
                            style={{
                                transform: `translateX(-${currentReview * (isMobile ? 100 : (100 / reviewsPerPage))}%)`,
                                transitionProperty: isTransitioning ? 'transform' : 'none'
                            }}
                        >
                            {[...displayReviews, ...displayReviews.slice(0, reviewsPerPage)].map((testimonial, index) => (
                                <div
                                    key={index}
                                    className={`${isMobile ? 'w-full px-0' : 'w-1/3 px-4'} flex-shrink-0 transition-opacity duration-300`}
                                >
                                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-50 flex flex-col h-full hover:shadow-2xl transition-all duration-300">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="relative group/avatar">
                                                    <img
                                                        src={testimonial.photo || testimonial.author_photo || `https://ui-avatars.com/api/?name=${testimonial.name || testimonial.author_name}&background=random`}
                                                        alt={testimonial.name || testimonial.author_name}
                                                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md group-hover:scale-110 transition-transform duration-300"
                                                        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name || testimonial.author_name}&background=random` }}
                                                    />
                                                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md border border-gray-50">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-4 h-4" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-black text-primary flex items-center text-base lg:text-lg">
                                                        {testimonial.name || testimonial.author_name}
                                                        <span className="ml-2 inline-block w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[10px] text-white shadow-sm">✓</span>
                                                    </div>
                                                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">{testimonial.time || testimonial.time_description}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {renderStars(testimonial.rating)}

                                        <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-8 flex-grow italic shrink-0">
                                            "{testimonial.comment || testimonial.text}"
                                        </p>

                                        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6">
                                            <div className="flex items-center space-x-2">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-6 h-6" />
                                                <span className="text-[11px] text-gray-400 font-black uppercase tracking-widest">Opinión en Google</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Indicators */}
                        {isMobile && (
                            <div className="flex justify-center space-x-2 mt-8">
                                {displayReviews.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentReview(i)}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentReview === i ? 'bg-[var(--color-accent)] w-6' : 'bg-gray-300'}`}
                                        aria-label={`Girar a reseña ${i + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>




            {/* Social Media Section — TABLET (Inverted layout) */}
            <div className="bg-white py-24 pb-48">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
                    {/* LEFT SIDE — TABLET */}
                    <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
                        <div className="relative w-full max-w-lg">
                            <div className="absolute -inset-4 bg-accent/10 rounded-[3rem] blur-2xl"></div>
                            {/* TABLET MOCKUP WRAPPER */}
                            <div className="relative bg-[#1a1c23] rounded-[2.5rem] p-4 shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-700 aspect-[3/4] flex flex-col overflow-hidden border-[6px] border-[#2a2c35] ring-1 ring-white/10">

                                {/* Tablet Camera Hole */}
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black border border-gray-700 z-30"></div>
                                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#111] z-30">
                                    <div className="absolute top-0.5 right-0.5 w-[3px] h-[3px] rounded-full bg-blue-900/40"></div>
                                </div>

                                {/* YouTube, Facebook, TikTok — Live iframe embed */}
                                {selectedSocial !== 'instagram' && (
                                    <div className="w-full h-full relative rounded-2xl overflow-hidden mt-3 bg-white">
                                        <iframe
                                            key={selectedSocial}
                                            src={socialData[selectedSocial].embedUrl}
                                            className="w-full h-full border-none"
                                            title={socialData[selectedSocial].name}
                                            allowFullScreen
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        ></iframe>
                                        <div className="absolute top-3 right-3 z-20">
                                            <a href={socialData[selectedSocial].url} target="_blank" rel="noopener noreferrer"
                                                className="bg-accent/90 hover:bg-accent text-white p-2.5 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center backdrop-blur-sm">
                                                <ExternalLink size={16} />
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Instagram — Perfil en modo oscuro */}
                                {selectedSocial === 'instagram' && (
                                    <div className="w-full h-full bg-black rounded-2xl overflow-y-auto flex flex-col text-white mt-3 ring-1 ring-white/5" style={{ scrollbarWidth: 'none' }}>
                                        {/* Header bar */}
                                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                                            <div className="flex items-center space-x-2">
                                                <Instagram size={18} className="text-white" />
                                                <span className="text-sm font-bold">grupo_llantero_noguez</span>
                                            </div>
                                            <a href={socialData.instagram.url} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink size={16} className="text-gray-400 hover:text-white transition-colors" />
                                            </a>
                                        </div>

                                        {/* Profile section */}
                                        <div className="p-5 flex items-center space-x-6">
                                            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[3px] flex-shrink-0">
                                                <div className="w-full h-full rounded-full bg-black p-[2px]">
                                                    <img src="/images/general/header.webp" className="w-full h-full rounded-full object-cover" alt="Avatar" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex space-x-6 text-center mb-1">
                                                    <div><span className="font-bold text-base block">312</span><span className="text-[10px] text-gray-400">publicaciones</span></div>
                                                    <div><span className="font-bold text-base block">394</span><span className="text-[10px] text-gray-400">seguidores</span></div>
                                                    <div><span className="font-bold text-base block">102</span><span className="text-[10px] text-gray-400">seguidos</span></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bio */}
                                        <div className="px-5 pb-3">
                                            <p className="font-bold text-sm mb-1">GRUPO LLANTERO NOGUEZ</p>
                                            <p className="text-[11px] text-gray-300 leading-relaxed">
                                                Rines | Llantas | Refacciones | Mecánica<br />
                                                Escríbenos: 4424531774<br />
                                                📍 Prol. Corregidora Nte. 937, Villas del Parque., Querétaro 76140
                                            </p>
                                        </div>

                                        {/* Highlights */}
                                        <div className="flex space-x-4 px-5 pb-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                                            {['CTM BENEFIC...', 'Vacantes 🚫', 'Clientes', '40%OFF RINES', 'Contáctanos', 'Marcas', 'Servicios'].map(h => (
                                                <div key={h} className="flex flex-col items-center flex-shrink-0">
                                                    <div className="w-14 h-14 rounded-full border-2 border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-1">
                                                        <Zap size={16} className="text-gray-400" />
                                                    </div>
                                                    <span className="text-[8px] text-gray-500 truncate max-w-[55px] text-center">{h}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tab bar */}
                                        <div className="flex border-t border-b border-white/10 mt-2">
                                            <div className="flex-1 py-2.5 flex justify-center border-b-2 border-white">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
                                            </div>
                                            <div className="flex-1 py-2.5 flex justify-center">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                            </div>
                                            <div className="flex-1 py-2.5 flex justify-center">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                            </div>
                                        </div>

                                        {/* Post grid — 3 columns */}
                                        <div className="grid grid-cols-3 gap-[1px] flex-1">
                                            {[
                                                '/images/general/header.webp',
                                                '/images/general/vacante.webp',
                                                '/images/productos/LLAN0010.webp',
                                                '/images/general/promo_1.webp',
                                                '/images/productos/RIN0001.webp',
                                                '/images/general/promo_2.webp',
                                                '/images/productos/LLAN0042.webp',
                                                '/images/general/promo_3.webp',
                                                '/images/productos/BAT0001.webp'
                                            ].map((img, i) => (
                                                <div key={i} className="aspect-square bg-gray-900 overflow-hidden cursor-pointer group relative">
                                                    <img src={img} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" alt={`Post ${i}`} />
                                                    {i < 2 && <div className="absolute top-1 right-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="white" opacity="0.7"><polygon points="5 3 19 12 5 21 5 3" /></svg></div>}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Follow button */}
                                        <div className="p-4 bg-black border-t border-white/10">
                                            <a href={socialData.instagram.url} target="_blank" rel="noopener noreferrer"
                                                className="block w-full py-3 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600 text-white font-bold text-[11px] uppercase tracking-[0.15em] text-center rounded-lg shadow-xl hover:opacity-90 transition-opacity">
                                                Seguir en Instagram
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE — TEXT AND BUTTONS */}
                    <div className="w-full lg:w-1/2 text-left order-1 lg:order-2 pl-0 lg:pl-10">
                        <div className="inline-block px-4 py-1.5 mb-2 text-xs font-bold tracking-widest text-accent uppercase bg-red-50 rounded-full border border-accent/10">
                            Comunidad
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black text-primary drop-shadow-sm mb-4 uppercase">
                            Encuentra ofertas, tips y más <br />
                            <span className="text-accent">en nuestras redes</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-accent rounded-full mb-10"></div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {['youtube', 'instagram', 'facebook', 'tiktok'].map((social) => (
                                <div
                                    key={social}
                                    onClick={() => setSelectedSocial(social)}
                                    className={`cursor-pointer bg-gray-50 p-6 rounded-sm border-l-4 transition-all duration-300 group ${selectedSocial === social
                                            ? `border-${socialData[social].color}-600 shadow-xl ring-1 ring-${socialData[social].color}-600/20 translate-x-1 bg-white`
                                            : `border-gray-200 hover:border-${socialData[social].color}-600 hover:shadow-lg hover:bg-white`}`}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <div className={selectedSocial === social ? `text-${socialData[social].color}-600` : 'text-gray-400 group-hover:text-primary transition-colors'}>
                                            {socialData[social].icon}
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest opacity-60">{socialData[social].name}</span>
                                    </div>
                                    <h3 className="font-bold text-primary mb-1 text-base">
                                        {social === 'youtube' ? '¡Danos like!' : social === 'instagram' ? '¡Síguenos!' : social === 'facebook' ? 'Únete' : 'Reacciona'}
                                    </h3>
                                    <p className="text-gray-500 text-xs font-medium">
                                        {social === 'youtube' ? 'Pruebas de manejo en 4K.' : social === 'instagram' ? 'Lo mejor del mundo motor.' : social === 'facebook' ? 'Nuestra comunidad crece.' : 'Tips rápidos de expertos.'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

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
                        {/* Duplicate set for seamless scrolling - FULL COPY */}
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
