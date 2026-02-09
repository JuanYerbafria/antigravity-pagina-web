import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {
    // Format price with commas
    const formatPrice = (price) => {
        return parseFloat(price).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image Container with Badge */}
            <div className="relative h-48 overflow-hidden bg-white flex items-center justify-center">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className={`w-full h-full object-contain transition-transform duration-300 hover:scale-110 ${product.stock === 0 ? 'opacity-50 grayscale' : ''}`}
                        width="400"
                        height="400"
                    />
                ) : (
                    <div className="text-gray-400 text-center">
                        <span className="text-4xl">🚗</span>
                        <p className="mt-2">Sin imagen</p>
                    </div>
                )}

                {/* Out of Stock Badge */}
                {product.stock === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/10">
                        <div className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg transform -rotate-12 border-2 border-white">
                            AGOTADO
                        </div>
                    </div>
                )}

                {/* Featured Badge - Only show if product is featured */}
                {product.is_featured === 1 && product.stock > 0 && (
                    <div className="absolute top-3 right-3 bg-[var(--color-highlight)] text-dark px-3 py-1 rounded-full text-xs font-bold shadow-md z-10">
                        Destacado
                    </div>
                )}

                {/* 4x3 Badge - Ribbon Style - NOT for Llantas Camión */}
                {product.promocion === '4x3' && product.stock > 0 && product.category !== 'Llantas Camión' && (
                    <div className="absolute top-4 left-0 z-20">
                        <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 shadow-md relative">
                            {/* Main content */}
                            <span className="uppercase tracking-wider">¡4x3!</span>

                            {/* Triangle for fold effect (optional, implies wrapping) */}
                            <div className="absolute top-0 right-[-10px] w-0 h-0 border-t-[12px] border-t-red-600 border-r-[10px] border-r-transparent border-b-[12px] border-b-red-600"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Star Rating */}
                <div className="flex items-center gap-2 mb-2">
                    {/* Numeric Rating */}
                    <span className="text-3xl font-bold text-dark">
                        {product.rating != null ? Number(product.rating).toFixed(1) : '5.0'}
                    </span>

                    {/* Stars */}
                    <div className="flex flex-col">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => {
                                const rating = product.rating || 5.0;
                                const starValue = i + 1;

                                if (rating >= starValue) {
                                    // Full star
                                    return <Star key={i} size={14} fill="#FBD748" className="text-[var(--color-highlight)]" />;
                                } else if (rating >= starValue - 0.5) {
                                    // Half star
                                    return (
                                        <div key={i} className="relative" style={{ width: '14px', height: '14px' }}>
                                            <Star size={14} fill="none" className="text-[var(--color-highlight)] absolute" />
                                            <div style={{ width: '50%', overflow: 'hidden' }}>
                                                <Star size={14} fill="#FBD748" className="text-[var(--color-highlight)]" />
                                            </div>
                                        </div>
                                    );
                                } else {
                                    // Empty star
                                    return <Star key={i} size={14} fill="none" className="text-[var(--color-highlight)]" />;
                                }
                            })}
                        </div>
                        <span className="text-xs text-gray-500">Calificación</span>
                    </div>
                </div>

                {/* Brand/Category */}
                <h3 className="text-lg font-bold text-dark mb-1">{product.category || 'Goodyear'}</h3>

                {/* SKU */}
                {product.sku && (
                    <p className="text-xs text-gray-500 mb-2">SKU: {product.sku}</p>
                )}

                {/* Product Name/Description */}
                <p className="text-gray-600 text-sm mb-2">{product.name}</p>

                {/* Specs/Measurements */}
                {product.specs && (
                    <p className="text-xs text-gray-500 mb-4 bg-gray-100 px-2 py-1 rounded inline-block">
                        Medida: {product.specs}
                    </p>
                )}

                {/* Price and Button */}
                <div className="flex justify-between items-center">
                    {product.category === 'Llantas' ? (
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-400 line-through">${formatPrice(product.price)}</span>
                            <span className="text-2xl font-bold text-accent">${formatPrice(product.price / 1.25)}</span>
                        </div>
                    ) : product.category === 'Rines' ? (
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-400 line-through">${formatPrice(product.price)}</span>
                            <span className="text-2xl font-bold text-accent">${formatPrice(product.price / 1.25)}</span>
                        </div>
                    ) : product.category === 'Baterías' ? (
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-400 line-through">${formatPrice(product.price)}</span>
                            <span className="text-2xl font-bold text-accent">${formatPrice(product.price / 1.20)}</span>
                        </div>
                    ) : (
                        /* Llantas Camion and other categories - NO discount */
                        <span className="text-2xl font-bold text-dark">${formatPrice(product.price)}</span>
                    )}
                    <Link
                        to={`/productos/${product.id}`}
                        className="bg-[var(--color-highlight)] text-dark px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-500 transition-colors"
                    >
                        Ver Detalles
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
