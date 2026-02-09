import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

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
                    src="/images/logo/noguezin.webp"
                    alt="Cotiza aquí"
                    className="w-24 h-24 object-contain drop-shadow-xl"
                />
                <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                    ¡Cotiza!
                </div>
            </div>
            <span className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-full mr-3 flex flex-col items-center gap-1 whitespace-nowrap text-center">
                <span>Cotiza aquí</span>
                <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg">
                    <MessageCircle size={16} className="text-[#25D366] fill-[#25D366]" />
                    <span className="tracking-wider">442 840 6201</span>
                </span>
            </span>
        </a>
    );
};

export default FloatingQuoteButton;
