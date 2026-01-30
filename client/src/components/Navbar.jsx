import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const getLinkClass = (path) => {
        const isActive = location.pathname === path;
        return isActive
            ? "text-accent font-bold border-b-2 border-accent transition-colors"
            : "hover:text-accent transition-colors";
    };

    const getMobileLinkClass = (path) => {
        const isActive = location.pathname === path;
        return isActive
            ? "block py-2 text-accent font-bold border-l-4 border-accent pl-2 bg-gray-50"
            : "block py-2 hover:text-accent hover:bg-gray-50 pl-2 transition-colors";
    };

    return (
        <nav className="bg-white/95 backdrop-blur-sm text-gray-800 shadow-lg sticky top-0 z-50 border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold tracking-wider flex items-center">
                        <img src="/images/general/logo.webp" alt="Logo Noguez" className="h-16 mr-3" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className={getLinkClass('/')}>Inicio</Link>
                        <Link to="/productos" className={getLinkClass('/productos')}>Productos</Link>
                        <Link to="/servicios" className={getLinkClass('/servicios')}>Servicios</Link>
                        <Link to="/sucursales" className={getLinkClass('/sucursales')}>Sucursales</Link>
                        <Link to="/nosotros" className={getLinkClass('/nosotros')}>Nosotros</Link>
                        <Link to="/unete-al-equipo" className={getLinkClass('/unete-al-equipo')}>Únete al Equipo</Link>
                        <Link to="/blog" className={getLinkClass('/blog')}>Blog</Link>
                        <Link to="/contacto" className="bg-accent hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors flex items-center shadow-md hover:shadow-lg">
                            <Phone size={18} className="mr-2" /> Contacto
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-accent focus:outline-none p-2">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isOpen && (
                    <div className="md:hidden pb-4 pt-2 animate-fadeIn bg-white border-t border-gray-100">
                        <Link to="/" className={getMobileLinkClass('/')} onClick={() => setIsOpen(false)}>Inicio</Link>
                        <Link to="/productos" className={getMobileLinkClass('/productos')} onClick={() => setIsOpen(false)}>Productos</Link>
                        <Link to="/servicios" className={getMobileLinkClass('/servicios')} onClick={() => setIsOpen(false)}>Servicios</Link>
                        <Link to="/sucursales" className={getMobileLinkClass('/sucursales')} onClick={() => setIsOpen(false)}>Sucursales</Link>
                        <Link to="/nosotros" className={getMobileLinkClass('/nosotros')} onClick={() => setIsOpen(false)}>Nosotros</Link>
                        <Link to="/unete-al-equipo" className={getMobileLinkClass('/unete-al-equipo')} onClick={() => setIsOpen(false)}>Únete al Equipo</Link>
                        <Link to="/blog" className={getMobileLinkClass('/blog')} onClick={() => setIsOpen(false)}>Blog</Link>
                        <Link to="/contacto" className="block py-2 text-white bg-accent font-bold text-center mt-2 mx-4 rounded-md shadow-sm" onClick={() => setIsOpen(false)}>Contacto</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
