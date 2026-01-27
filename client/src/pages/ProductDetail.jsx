import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { ArrowLeft, Star, ShoppingCart, CheckCircle, Car, Store, Package } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-dark mb-4">Producto no encontrado</h2>
                <Link to="/productos" className="text-accent hover:underline">Volver a Productos</Link>
            </div>
        );
    }

    // Parse specs if it's a JSON string
    let specs = {};
    try {
        specs = typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs || {};
    } catch (e) {
        specs = {};
    }

    // Format price with commas
    const formatPrice = (price) => {
        return parseFloat(price).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/productos" className="inline-flex items-center text-gray-600 hover:text-accent mb-6 transition-colors text-sm">
                <ArrowLeft size={18} className="mr-2" /> Volver a Productos
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Product Image */}
                <div className="relative">
                    <div
                        className="bg-white rounded-lg overflow-hidden h-[400px] flex items-center justify-center p-4 cursor-zoom-in"
                        onMouseMove={(e) => {
                            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                            const x = ((e.clientX - left) / width) * 100;
                            const y = ((e.clientY - top) / height) * 100;
                            e.currentTarget.style.setProperty('--zoom-x', `${x}%`);
                            e.currentTarget.style.setProperty('--zoom-y', `${y}%`);
                        }}
                    >
                        {product.image_url ? (
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="max-w-full max-h-full object-contain transition-transform duration-100 ease-linear hover:scale-[2]"
                                style={{
                                    transformOrigin: 'var(--zoom-x, 50%) var(--zoom-y, 50%)'
                                }}
                            />
                        ) : (
                            <div className="text-gray-400 text-center">
                                <span className="text-5xl">🚗</span>
                                <p className="mt-4 text-sm">Sin imagen</p>
                            </div>
                        )}
                    </div>
                    {product.is_featured === 1 && (
                        <div className="absolute top-4 right-4 bg-[var(--color-highlight)] text-dark px-3 py-1 rounded-full text-xs font-bold shadow-md pointer-events-none">
                            Destacado
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div>
                    {/* Category */}
                    <span className="text-accent font-bold text-xs uppercase tracking-wider">{product.category}</span>

                    {/* Product Name */}
                    <h1 className="text-3xl font-bold text-dark mt-1 mb-2 leading-tight">{product.name}</h1>

                    {/* SKU */}
                    {product.sku && (
                        <p className="text-xs text-gray-500 mb-3">SKU: {product.sku}</p>
                    )}

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                        {/* Numeric Rating */}
                        <span className="text-2xl font-bold text-dark">
                            {product.rating != null ? Number(product.rating).toFixed(1) : '5.0'}
                        </span>

                        {/* Stars */}
                        <div className="flex flex-col">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => {
                                    const rating = product.rating || 5.0;
                                    const starValue = i + 1;

                                    if (rating >= starValue) {
                                        return <Star key={i} size={16} fill="#FBD748" className="text-[var(--color-highlight)]" />;
                                    } else if (rating >= starValue - 0.5) {
                                        return (
                                            <div key={i} className="relative" style={{ width: '16px', height: '16px' }}>
                                                <Star size={16} fill="none" className="text-[var(--color-highlight)] absolute" />
                                                <div style={{ width: '50%', overflow: 'hidden' }}>
                                                    <Star size={16} fill="#FBD748" className="text-[var(--color-highlight)]" />
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return <Star key={i} size={16} fill="none" className="text-[var(--color-highlight)]" />;
                                    }
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Price */}
                    {/* Price */}
                    <div className="mb-6">
                        {/* Standard Price Display */}
                        {product.category === 'Llantas' ? (
                            <div>
                                <span className="text-lg text-gray-400 line-through block mb-1">${formatPrice(product.price)}</span>
                                <span className="text-4xl font-bold text-accent">${formatPrice(product.price / 1.25)}</span>
                                <span className="text-xs text-gray-500 ml-2">Precio con descuento</span>
                            </div>
                        ) : product.category === 'Rines' ? (
                            <div>
                                <span className="text-lg text-gray-400 line-through block mb-1">${formatPrice(product.price)}</span>
                                <span className="text-4xl font-bold text-accent">${formatPrice(product.price / 1.25)}</span>
                                <span className="text-xs text-gray-500 ml-2">Precio con descuento</span>
                            </div>
                        ) : product.category === 'Baterías' ? (
                            <div>
                                <span className="text-lg text-gray-400 line-through block mb-1">${formatPrice(product.price)}</span>
                                <span className="text-4xl font-bold text-accent">${formatPrice(product.price / 1.20)}</span>
                                <span className="text-xs text-gray-500 ml-2">Precio con descuento</span>
                            </div>
                        ) : (
                            <span className="text-4xl font-bold text-dark">${formatPrice(product.price)}</span>
                        )}

                        {/* 4x3 Promotion Block */}
                        {product.promocion === '4x3' && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">¡PROMOCIÓN 4x3!</span>
                                    <span className="text-red-600 text-sm font-bold">Llévate 4 y paga solo 3</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-red-600">${formatPrice(product.price * 3)}</span>
                                    <span className="text-sm text-gray-500 font-medium">Pago total por 4 llantas</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Shipping Info */}
                    <div className="mb-6 text-gray-600">
                        <div className="flex items-center gap-2 mb-2">
                            <Car size={20} className="text-accent" />
                            <span className="font-bold text-lg">+ envio</span>
                        </div>
                        <div className="space-y-2 ml-1">
                            <div className="flex items-center gap-2">
                                <Car size={16} className="text-gray-500" />
                                <span className="text-sm text-gray-700">Envio a domicilio: 3-5 días</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Store size={16} className="text-gray-500" />
                                <span className="text-sm text-gray-700">Entrega en sucursal: 1-2 días</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Package size={16} className="text-accent" />
                                <span className="text-sm text-accent font-medium">Envio o recoge en cualquiera de nuestras 5 sucursales</span>
                            </div>
                        </div>
                    </div>

                    {/* Free Services */}
                    {product.category === 'Llantas' && (
                        <div className="bg-gray-100 p-4 rounded-lg mb-6 border-l-4 border-accent">
                            <p className="font-bold text-dark mb-2">En la compra de 2 llantas o más incluye gratis:</p>
                            <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                                <li className="flex items-center"><CheckCircle size={14} className="text-accent mr-1" /> Instalación</li>
                                <li className="flex items-center"><CheckCircle size={14} className="text-accent mr-1" /> Balanceo</li>
                                <li className="flex items-center"><CheckCircle size={14} className="text-accent mr-1" /> Válvula</li>
                                <li className="flex items-center"><CheckCircle size={14} className="text-accent mr-1" /> Aire o Nitrógeno</li>
                            </ul>
                        </div>
                    )}
                    {product.category === 'Rines' && (
                        <div className="bg-gray-100 p-4 rounded-lg mb-6 border-l-4 border-accent">
                            <p className="font-bold text-dark flex items-center">
                                <CheckCircle size={18} className="text-accent mr-2" />
                                Instalación Gratis
                            </p>
                        </div>
                    )}

                    {/* Description */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-dark mb-2">Descripción</h3>
                        {product.description && product.description.split('\n').map((line, index) => {
                            const trimmedLine = line.trim();
                            if (!trimmedLine) return <div key={index} className="h-2"></div>;

                            if (trimmedLine.includes('Beneficios Destacados:')) {
                                return <h4 key={index} className="font-bold text-dark mt-4 mb-2 text-base">{trimmedLine}</h4>;
                            }

                            if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
                                const parts = trimmedLine.substring(1).split(':');
                                if (parts.length > 1) {
                                    const title = parts[0].trim();
                                    const content = parts.slice(1).join(':').trim();
                                    return (
                                        <div key={index} className="flex items-start mb-2 ml-2">
                                            <span className="mr-2 mt-1.5 h-1.5 w-1.5 bg-dark rounded-full flex-shrink-0"></span>
                                            <p className="text-sm text-gray-700 leading-snug">
                                                <span className="font-bold text-dark">{title}:</span> {content}
                                            </p>
                                        </div>
                                    );
                                }
                                return (
                                    <div key={index} className="flex items-start mb-2 ml-2">
                                        <span className="mr-2 mt-1.5 h-1.5 w-1.5 bg-dark rounded-full flex-shrink-0"></span>
                                        <p className="text-sm text-gray-700 leading-snug">{trimmedLine.substring(1).trim()}</p>
                                    </div>
                                );
                            }

                            return <p key={index} className="text-gray-700 leading-snug text-sm mb-2">{trimmedLine}</p>;
                        })}
                    </div>

                    {/* Specifications */}
                    {Object.keys(specs).length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-dark mb-2">Especificaciones</h3>
                            <div className="bg-gray-50 rounded-lg p-3 grid grid-cols-2 gap-x-4 gap-y-2">
                                {Object.entries(specs).map(([key, value]) => (
                                    <div key={key} className="flex justify-between border-b border-gray-200 pb-1 text-sm">
                                        <span className="font-semibold text-gray-700 capitalize mr-2">{key}:</span>
                                        <span className="text-gray-600 truncate">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Features */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-dark mb-2">Características</h3>
                        <ul className="space-y-1 text-sm">
                            <li className="flex items-start">
                                <CheckCircle className="text-accent mr-2 flex-shrink-0 mt-0.5" size={16} />
                                <span className="text-gray-700">Garantía de fábrica incluida</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="text-accent mr-2 flex-shrink-0 mt-0.5" size={16} />
                                <span className="text-gray-700">Instalación profesional disponible</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="text-accent mr-2 flex-shrink-0 mt-0.5" size={16} />
                                <span className="text-gray-700">Producto original certificado</span>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        {product.stock > 0 ? (
                            <>
                                <Link
                                    to="/contacto"
                                    className="flex-1 bg-accent hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
                                >
                                    <ShoppingCart className="mr-2" size={18} />
                                    Solicitar Cotización
                                </Link>
                                <a
                                    href="tel:4428406201"
                                    className="flex-1 bg-[var(--color-highlight)] hover:bg-yellow-500 text-dark px-6 py-3 rounded-lg font-bold flex items-center justify-center transition-colors shadow-md hover:shadow-lg"
                                >
                                    Llamar Ahora
                                </a>
                            </>
                        ) : (
                            <div className="w-full bg-gray-200 text-gray-500 px-6 py-4 rounded-lg font-bold flex items-center justify-center cursor-not-allowed border border-gray-300">
                                <span className="text-lg">🚫 Producto No Disponible</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
