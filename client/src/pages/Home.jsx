import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, Star, Shield, Award, Wrench } from 'lucide-react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import TireSearch from '../components/TireSearch';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    return (
        <div>
            {/* Hero Section */}
            <div className="relative bg-primary text-white py-28 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src="/images/general/header.png"
                        alt="Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/50 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        {/* Badge */}
                        <div className="flex items-center space-x-2 text-[var(--color-highlight)] font-bold tracking-wider mb-3">
                            <Shield size={20} className="text-[var(--color-highlight)]" />
                            <span className="text-sm md:text-base">MÁS DE 6 AÑOS DE EXPERIENCIA</span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4 text-white">
                            Tu Seguridad Rueda <br />
                            <span className="text-[var(--color-highlight)]">Con Nosotros</span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
                            Expertos en llantas, rines y servicios automotrices. Equipos actualizados para un mejor servicio y personal capacitado para cuidar de tu vehículo.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <a href="/contacto" className="bg-accent hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold flex items-center justify-center transition-colors">
                                Solicitar Cotización <span className="ml-2">→</span>
                            </a>
                            <a href="/productos" className="bg-white hover:bg-gray-100 text-primary px-8 py-3 rounded-lg font-bold flex items-center justify-center transition-colors">
                                Ver Productos
                            </a>
                        </div>

                        {/* Features Footer */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/10 pt-6">
                            <div className="flex items-center space-x-3">
                                <div className="bg-white/10 p-2 rounded-full">
                                    <Award className="text-accent" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">Técnicos Capacitados</h3>
                                    <p className="text-xs text-gray-400">Profesionales expertos</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="bg-white/10 p-2 rounded-full">
                                    <Shield className="text-accent" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">Garantía Total</h3>
                                    <p className="text-xs text-gray-400">100% satisfacción</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="bg-white/10 p-2 rounded-full">
                                    <Wrench className="text-accent" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">Equipos modernos y precisos</h3>
                                    <p className="text-xs text-gray-400">Herramientas que elevan la calidad del servicio</p>
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
                                { name: 'Hankook', src: '/images/general/Hankook.png' },
                                { name: 'Pirelli', src: '/images/general/pirelli.png' },
                                { name: 'Michelin', src: '/images/general/michelin_tire.png' },
                                { name: 'Kumho', src: '/images/general/kumho_tire.png' },
                                { name: 'Bridgestone', src: '/images/general/Bridgestone.png' },
                                { name: 'Tornel', src: '/images/general/tornel.png' },
                                { name: 'Continental', src: '/images/general/continental.png' },
                                { name: 'Cooper', src: '/images/general/cooper.png' },
                                { name: 'Mirage', src: '/images/general/Mirage.png' },
                                { name: 'Blackhawk', src: '/images/general/black.jpeg' },
                                { name: 'Toyo', src: '/images/general/toyo.png' },
                                { name: 'Bf Goodrich', src: '/images/general/bf_goodrich.png' },
                                { name: 'Yokohama', src: '/images/general/yoko.png' },
                                { name: 'Dunlop', src: '/images/general/dunlop.png' },
                                { name: 'Euzkadi', src: '/images/general/euzcadi.png' },
                                { name: 'Firestone', src: '/images/general/firestone.png' },
                                { name: 'Goodride', src: '/images/general/goodride.png' },
                                { name: 'Goodyear', src: '/images/general/goodyear.png' },
                                { name: 'Jktires', src: '/images/general/jktire.png' },
                                { name: 'Laufen', src: '/images/general/laufen.png' },
                                { name: 'Maxtrek', src: '/images/general/maxtrickpng.png' },
                                { name: 'Maxxis', src: '/images/general/maxxis.png' },
                                { name: 'Mazzini', src: '/images/general/mazzini.png' },
                                { name: 'Uniroyal', src: '/images/general/uni.png' },
                                { name: 'Wanli', src: '/images/general/wanli.png' },
                                { name: 'Winrun', src: '/images/general/win.png' }
                            ].map((brand, index) => (
                                <div key={`brand-1-${index}`} className="flex items-center justify-center w-32 h-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                    <img
                                        src={brand.src || `https://placehold.co/150x80/white/333?text=${brand.name}`}
                                        alt={brand.name}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Duplicate set for seamless scrolling */}
                        <div className="flex space-x-12 px-6">
                            {[
                                { name: 'Hankook', src: '/images/general/Hankook.png' },
                                { name: 'Pirelli', src: '/images/general/pirelli.png' },
                                { name: 'Michelin', src: '/images/general/michelin_tire.png' },
                                { name: 'Kumho', src: '/images/general/kumho_tire.png' },
                                { name: 'Bridgestone', src: '/images/general/Bridgestone.png' },
                                { name: 'Tornel', src: '/images/general/tornel.png' },
                                { name: 'Sportrack', src: null },
                                { name: 'Davanti', src: null },
                                { name: 'Mirage', src: '/images/general/Mirage.png' },
                                { name: 'Blackhawk', src: '/images/general/black.jpeg' },
                                { name: 'Toyo', src: '/images/general/toyo.png' },
                                { name: 'Nereus', src: null },
                                { name: 'Yokohama', src: '/images/general/yoko.png' }
                            ].map((brand, index) => (
                                <div key={`brand-2-${index}`} className="flex items-center justify-center w-32 h-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                    <img
                                        src={brand.src || `https://placehold.co/150x80/white/333?text=${brand.name}`}
                                        alt={brand.name}
                                        className="max-w-full max-h-full object-contain"
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
