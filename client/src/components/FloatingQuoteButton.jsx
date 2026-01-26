import React from 'react';
import { useLocation } from 'react-router-dom';

const FloatingQuoteButton = () => {
    const location = useLocation();

    // Do not show on contact page
    if (location.pathname === '/contacto') {
        return null;
    }

    // WhatsApp link with pre-filled message
    const whatsappNumber = '5214428406201'; // Format: country code + number without spaces or special characters
    const whatsappMessage = encodeURIComponent('¡Hola! Me gustaría solicitar una cotización.');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 flex flex-col items-center group hover:scale-110 transition-transform duration-300"
        >
            <div className="relative">
                <img
                    src="/images/logo/noguezin.png"
                    alt="Cotiza aquí"
                    className="w-24 h-24 object-contain drop-shadow-xl"
                />
                <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                    ¡Cotiza!
                </div>
            </div>
            <span className="bg-primary text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-full mr-3 whitespace-nowrap">
                Cotiza aquí
            </span>
        </a>
    );
};

export default FloatingQuoteButton;
