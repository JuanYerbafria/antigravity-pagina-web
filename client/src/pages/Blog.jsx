import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { ChevronLeft, ChevronRight, ArrowUpRight, Youtube, Instagram, Facebook, Zap, ExternalLink, Play } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [selectedSocial, setSelectedSocial] = useState('tiktok');
    const carouselRef = useRef(null);
    const videoSectionRef = useRef(null);
    const [videoInView, setVideoInView] = useState(false);

    // All platforms use iframes for LIVE content
    const socialData = {
        youtube: {
            name: 'YouTube',
            handle: '@llanterasnoguez3686',
            url: 'https://www.youtube.com/@llanterasnoguez3686/shorts',
            // Uploads playlist: Change UC to UU in channel ID
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

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/blog');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();

        // Intersection Observer for Video Autoplay
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVideoInView(true);
                } else {
                    setVideoInView(false); // Reset when out of view
                }
            },
            { threshold: 0.3 } // Reacciona cuando al menos el 30% es visible
        );

        if (videoSectionRef.current) {
            observer.observe(videoSectionRef.current);
        }

        return () => {
            if (videoSectionRef.current) {
                observer.unobserve(videoSectionRef.current);
            }
        };
    }, []);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const { scrollLeft, clientWidth } = carouselRef.current;
            const scrollAmount = direction === 'next' ? clientWidth : -clientWidth;
            carouselRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans">
            <Helmet>
                <title>Blog y Consejos | Grupo Llantero Noguez</title>
                <meta name="description" content="Lee nuestros últimos artículos sobre mantenimiento automotriz, consejos para tus llantas y novedades de Grupo Llantero Noguez." />
            </Helmet>

            {/* Hero Section */}
            <div className="relative h-[600px] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/images/general/header.webp" alt="Blog Hero" className="w-full h-full object-cover shadow-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/40 to-transparent"></div>
                </div>
                <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
                    <div className="max-w-4xl text-left">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-[1.1] animate-fade-in-down drop-shadow-2xl">
                            Grupo Llantero <br /><span className="text-accent">Noguez</span>
                        </h1>
                        <div className="max-w-2xl border-l-4 border-accent pl-6 mb-8 mt-6 animate-fade-in-up">
                            <p className="text-gray-100 text-base md:text-lg font-medium leading-relaxed drop-shadow-lg opacity-90">
                                Somos una empresa líder en el sector automotriz con más de 6 años de experiencia sirviendo a la comunidad de Santiago de Querétaro. Expertos en la venta de llantas, rines y servicios de mecánica general.
                            </p>
                        </div>
                        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <Link to="/nosotros" className="inline-block bg-accent hover:bg-white hover:text-accent text-white font-bold py-4 px-10 rounded-sm transition-all shadow-xl tracking-wide text-sm">
                                Conocer más
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* TIPS & CONSEJOS */}
            <div className="bg-white py-24 pb-24 border-b border-gray-100">
                <div className="container mx-auto px-4 text-left">
                    <div className="flex items-end justify-between mb-16 border-b border-gray-100 pb-10">
                        <div className="text-left">
                            <div className="inline-block px-4 py-1.5 mb-2 text-xs font-bold tracking-widest text-accent uppercase bg-red-50 rounded-full border border-accent/10">
                                Protocolos de Mantenimiento
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-primary drop-shadow-sm mb-4">
                                Tips & <span className="text-accent">consejos</span>
                            </h2>
                            <div className="w-24 h-1.5 bg-accent rounded-full"></div>
                        </div>
                        <div className="flex space-x-3 mb-2">
                            <button onClick={() => scroll('prev')} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all duration-300 shadow-sm"><ChevronLeft size={24} /></button>
                            <button onClick={() => scroll('next')} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all duration-300 shadow-sm"><ChevronRight size={24} /></button>
                        </div>
                    </div>
                    <div ref={carouselRef} className="flex overflow-x-auto gap-8 scroll-smooth no-scrollbar snap-x snap-mandatory pb-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {posts.length > 0 ? posts.map((post, index) => {
                            const rhythm = index % 3;
                            const isLarge = rhythm === 0;
                            return (
                                <div key={post.id} className={`${isLarge ? 'w-full md:w-[65%]' : 'w-[85%] md:w-[32%]'} flex-shrink-0 snap-start px-1`}>
                                    <div className="relative h-[550px] md:h-[600px] rounded-sm overflow-hidden group shadow-2xl">
                                        <div className="absolute inset-0">
                                            <img src={post.image_url || '/images/general/header.webp'} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                            
                                            {/* Date Badge - Inspired by Image 2 */}
                                            <div className="absolute top-0 left-8 z-20 bg-accent text-white px-5 py-6 flex flex-col items-center justify-center min-w-[70px] shadow-xl animate-fade-in">
                                                <span className="text-3xl font-black leading-none tracking-tighter">
                                                    {post.published_at ? new Date(post.published_at).getDate() : new Date().getDate()}
                                                </span>
                                                <span className="text-sm font-bold uppercase tracking-widest mt-1 opacity-90">
                                                    {post.published_at 
                                                        ? new Date(post.published_at).toLocaleString('es-ES', { month: 'short' }).replace('.', '') 
                                                        : new Date().toLocaleString('es-ES', { month: 'short' }).replace('.', '')}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end items-start text-left">
                                            <span className="text-[10px] md:text-xs font-bold tracking-wide text-highlight mb-4 uppercase drop-shadow-md">{rhythm === 1 ? 'Lubricación' : rhythm === 2 ? 'Tips y consejos' : 'Protocolo de rendimiento'}</span>
                                            <h3 className={`${isLarge ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'} font-bold text-white mb-6 leading-tight group-hover:text-highlight transition-colors duration-300 uppercase`}>{post.title}</h3>
                                            <p className="text-gray-300 text-sm md:text-base mb-8 line-clamp-3 opacity-80 md:max-w-xl font-medium">{post.content}</p>
                                            <Link to={`/blog/${post.id}`} className="flex items-center text-white font-bold hover:text-highlight transition-all tracking-wide text-[10px] md:text-sm group/link">
                                                <span className="border-b-2 border-white group-hover/link:border-highlight pb-1 whitespace-nowrap uppercase">Leer protocolo</span>
                                                <ArrowUpRight size={18} className="ml-2 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="w-full text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                                <p className="text-gray-400 font-bold tracking-widest text-xs uppercase">No hay protocolos de mantenimiento publicados aún.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Social Media Section — TARJETA DE LADO */}
            <div className="bg-white py-24 pb-48">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2 text-left">
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
                                    className={`cursor-pointer bg-gray-50 p-6 rounded-sm border-l-4 transition-all duration-300 group ${
                                        selectedSocial === social
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

                    {/* RIGHT SIDE — TARJETA INCLINADA DE LADO (RESTORED) */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <div className="relative w-full max-w-lg">
                            <div className="absolute -inset-4 bg-accent/10 rounded-[3rem] blur-2xl"></div>
                            {/* TABLET MOCKUP WRAPPER */}
                            <div className="relative bg-[#1a1c23] rounded-[2.5rem] p-4 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 aspect-[3/4] flex flex-col overflow-hidden border-[6px] border-[#2a2c35] ring-1 ring-white/10">
                                
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

                                {/* Instagram — Perfil en modo oscuro (Instagram NO tiene plugin de embed como Facebook) */}
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
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                                            </div>
                                            <div className="flex-1 py-2.5 flex justify-center">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                                            </div>
                                            <div className="flex-1 py-2.5 flex justify-center">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
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
                                                    {i < 2 && <div className="absolute top-1 right-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="white" opacity="0.7"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>}
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
                </div>
            </div>

            {/* Featured Video Section — DISEÑO OSCURO / MOCKUP STYLE */}
            <section 
                ref={videoSectionRef}
                className="bg-gray-950 py-24 pb-32"
            >
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    {/* Video Description */}
                    <div className="w-full lg:w-5/12 text-left order-2 lg:order-1">
                        <div className="inline-block px-4 py-1.5 mb-2 text-xs font-bold tracking-widest text-white uppercase bg-white/10 rounded-lg border border-white/20">
                            LLANTAS Y RINES
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black text-white drop-shadow-sm mb-4">
                            TECNOLOGÍA <span className="text-accent uppercase">Y DISEÑO</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-accent rounded-full mb-8"></div>
                        
                        <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
                            Explora las últimas tendencias en neumáticos de alto desempeño y rines de aleación. 
                            Mejora la estética y el rendimiento de tu vehículo con nuestra selección <strong>Premium</strong>.
                        </p>

                        <a 
                            href="https://www.youtube.com/watch?v=uEkrP5fVAPw" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-6 group"
                        >
                            <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center text-white group-hover:bg-white group-hover:text-accent transition-all duration-300 shadow-lg shadow-red-500/20">
                                <Play size={24} fill="currentColor" />
                            </div>
                            <span className="text-white font-black text-lg border-b-2 border-transparent group-hover:border-accent transition-all uppercase tracking-widest">
                                VER ANÁLISIS COMPLETO
                            </span>
                        </a>
                    </div>

                    {/* YouTube Video Player Wrapper */}
                    <div className="w-full lg:w-7/12 order-1 lg:order-2">
                        <div className="relative aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 ring-1 ring-white/10 group">
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src={`https://www.youtube.com/embed/uEkrP5fVAPw?rel=0&autoplay=${videoInView ? 1 : 0}&mute=1`}
                                title="Video Destacado Dunlop SP Sport Maxx" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                                className="absolute inset-0 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
