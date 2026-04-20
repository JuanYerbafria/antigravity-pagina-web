import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { ArrowLeft, Star, ShoppingCart, CheckCircle, Car, Store, Package, Award, Wrench, Shield, Hash, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
                
                // Security check: Refacciones should not have a detail page
                if (response.data.category === 'Refacciones') {
                    navigate('/productos');
                }
                
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
            <Helmet>
                <title>{product.name} | {product.category} | Grupo Llantero Noguez</title>
                <meta name="description" content={`Compra ${product.name} en Grupo Llantero Noguez. Las mejores promociones en ${product.category} en Querétaro.`} />
            </Helmet>
            <Link 
                to={`/productos/${
                    product.category === 'Llantas' ? 'llantas' :
                    product.category === 'Llantas Camión' ? 'llantas-camion' :
                    product.category === 'Rines' ? 'rines' :
                    product.category === 'Baterías' ? 'baterias' :
                    product.category === 'Refacciones' ? 'refacciones' :
                    product.category === 'Materiales' ? 'materiales' :
                    product.category === 'Accesorios' ? 'accesorios' :
                    'llantas'
                }`} 
                className="inline-flex items-center text-gray-600 hover:text-accent mb-6 transition-colors text-sm"
            >
                <ArrowLeft size={18} className="mr-2" /> Volver a {product.category || 'Productos'}
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Product Image */}
                <div className="relative">
                    <div
                        className="bg-white rounded-lg overflow-hidden h-[400px] flex items-center justify-center p-4 cursor-zoom-in"
                        onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            e.currentTarget._rect = rect;
                        }}
                        onMouseMove={(e) => {
                            const rect = e.currentTarget._rect;
                            if (!rect) return;
                            const x = ((e.clientX - rect.left) / rect.width) * 100;
                            const y = ((e.clientY - rect.top) / rect.height) * 100;
                            e.currentTarget.style.setProperty('--zoom-x', `${x}%`);
                            e.currentTarget.style.setProperty('--zoom-y', `${y}%`);
                        }}
                    >
                        {product.image_url ? (
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="max-w-full max-h-full object-contain transition-transform duration-100 ease-linear hover:scale-[2]"
                                width="600"
                                height="400"
                                fetchPriority="high"
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

                    {/* Description (Moved below image) */}
                    <div className="mt-12 bg-white rounded-xl p-0 lg:p-2">
                        <h3 className="text-xl font-black text-primary mb-4 border-b border-gray-100 pb-2">Descripción del Producto</h3>
                        <div className="space-y-3">
                            {product.description && product.description.split('\n').map((line, index) => {
                                const trimmedLine = line.trim();
                                if (!trimmedLine) return <div key={index} className="h-2"></div>;

                                if (trimmedLine.includes('Beneficios Destacados:')) {
                                    return <h4 key={index} className="font-bold text-dark mt-6 mb-3 text-base flex items-center">
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                                        {trimmedLine}
                                    </h4>;
                                }

                                if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
                                    const parts = trimmedLine.substring(1).split(':');
                                    if (parts.length > 1) {
                                        const title = parts[0].trim();
                                        const content = parts.slice(1).join(':').trim();
                                        return (
                                            <div key={index} className="flex items-start mb-2 ml-2">
                                                <span className="mr-3 mt-2 h-1.5 w-1.5 bg-accent rounded-full flex-shrink-0 animate-pulse"></span>
                                                <p className="text-sm text-gray-700 leading-relaxed">
                                                    <span className="font-bold text-dark">{title}:</span> {content}
                                                </p>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div key={index} className="flex items-start mb-2 ml-2">
                                            <span className="mr-3 mt-2 h-1.5 w-1.5 bg-accent rounded-full flex-shrink-0"></span>
                                            <p className="text-sm text-gray-700 leading-relaxed">{trimmedLine.substring(1).trim()}</p>
                                        </div>
                                    );
                                }

                                return <p key={index} className="text-gray-600 leading-relaxed text-sm mb-3 text-justify px-1">{trimmedLine}</p>;
                            })}
                        </div>
                    </div>

                    {/* Specifications (Moved below image) */}
                    {Object.keys(specs).length > 0 && (
                        <div className="mt-10">
                            <h3 className="text-xl font-black text-primary mb-4 border-b border-gray-100 pb-2">Especificaciones Técnicas</h3>
                            <div className="bg-gray-50 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 border border-gray-100 shadow-inner">
                                {Object.entries(specs).map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center border-b border-gray-200 pb-2 text-sm group hover:border-accent transition-colors">
                                        <span className="font-bold text-gray-500 uppercase tracking-tighter text-[10px] mr-2">{key.replace('_', ' ')}:</span>
                                        <span className="text-primary font-black truncate">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Features (Moved below image) */}
                    <div className="mt-10 mb-8">
                        <h3 className="text-xl font-black text-primary mb-4 border-b border-gray-100 pb-2">Garantía y Confianza</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { title: 'Garantía de fábrica incluida', icon: Award },
                                { title: 'Instalación profesional disponible', icon: Wrench },
                                { title: 'Producto original certificado', icon: Shield },
                                { title: 'Expertos a tu servicio', icon: Award }
                            ].map((f, i) => (
                                <div key={i} className="flex items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-accent mr-3 flex-shrink-0">
                                        <CheckCircle size={20} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">{f.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    {/* Category */}
                    <span className="text-accent font-bold text-xs uppercase tracking-wider">{product.category}</span>

                    {/* Product Name */}
                    <h1 className="text-3xl font-bold text-dark mt-1 mb-2 leading-tight uppercase">{product.name}</h1>

                    {/* SKU & Rating */}
                    <div className="flex flex-col gap-1 mb-4">
                        <div className="text-gray-500 text-sm">
                            <span className="text-gray-500">SKU: <span className="uppercase">{product.sku || 'N/A'}</span></span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="font-bold text-lg text-dark">{product.rating || '5.0'}</span>
                            <div className="flex items-center text-[var(--color-highlight)] pb-1">
                                {[...Array(5)].map((_, i) => {
                                    const ratingValue = product.rating || 5;
                                    if (i < Math.floor(ratingValue)) {
                                        return <Star key={i} size={16} fill="currentColor" className="text-[var(--color-highlight)]" />;
                                    } else if (i < ratingValue) {
                                        return (
                                            <div key={i} className="relative">
                                                <Star size={16} fill="none" className="text-gray-300" />
                                                <div className="absolute top-0 left-0 overflow-hidden w-[50%]">
                                                    <Star size={16} fill="currentColor" className="text-[var(--color-highlight)]" />
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return <Star key={i} size={16} fill="none" className="text-gray-300" />;
                                    }
                                })}
                            </div>
                        </div>
                        {product.brand && (
                            <div className="text-gray-500 text-sm flex items-center mt-1">
                                <span className="mr-1">Marca:</span>
                                <span className="font-bold text-dark">{product.brand}</span>
                            </div>
                        )}
                    </div>

                    {/* Price Section */}
                    <div className="mb-6">
                        {(product.is_promo || product.promocion === '4x3' || product.old_price || product.category === 'Llantas' || product.category === 'Rines' || product.category === 'Baterías') ? (
                            <div>
                                <span className="text-lg text-gray-400 line-through block mb-1">
                                    ${formatPrice(product.old_price ? product.old_price : product.price)}
                                </span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-accent">
                                        ${formatPrice(
                                            product.old_price 
                                            ? product.price 
                                            : product.category === 'Llantas' ? product.price / 1.25 
                                            : product.category === 'Rines' ? product.price / 1.30
                                            : product.category === 'Baterías' ? product.price / 1.20
                                            : product.price
                                        )}
                                    </span>
                                    <span className="text-sm text-gray-500 ml-2">Precio con descuento {product.category === 'Baterías' && '(entregando casco)'}</span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <span className="text-4xl font-bold text-dark">${formatPrice(product.price)}</span>
                                <span className="text-sm text-gray-500 ml-2">Precio regular</span>
                            </div>
                        )}

                        {/* 4x3 Promotion Block */}
                        {product.promocion === '4x3' && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-[#e60000] text-white text-xs font-bold px-2 py-0.5 rounded">¡PROMOCIÓN 4x3!</span>
                                    <span className="text-[#e60000] text-sm font-bold">Llévate 4 y paga solo 3</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-[#e60000]">
                                        ${formatPrice(product.old_price ? (product.old_price * 3) : (product.price * 3))}
                                    </span>
                                    <span className="text-sm text-gray-500 font-medium">Pago total por 4 llantas</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Shipping Info */}
                    <div className="mb-6 border-t border-gray-100 pt-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Car size={24} className="text-accent" strokeWidth={2.5} />
                            <span className="font-extrabold text-[22px] text-[#334A60] tracking-tight">+ envio</span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Car size={18} className="text-gray-500 mt-0.5" />
                                <div>
                                    <p className="text-sm font-bold text-dark">Envío a domicilio</p>
                                    <p className="text-sm text-gray-500">Tiempo estimado: 3-5 días hábiles</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Store size={18} className="text-gray-500 mt-0.5" />
                                <div>
                                    <p className="text-sm font-bold text-dark">Entrega en sucursal</p>
                                    <p className="text-sm text-gray-500">Disponible en 1-2 días hábiles</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-4 bg-red-50 p-3 rounded-lg border border-red-100">
                                <Package size={18} className="text-accent" />
                                <span className="text-sm text-accent font-bold">¡Recoge en cualquiera de nuestras 5 sucursales!</span>
                            </div>
                        </div>
                    </div>

                    {/* Services Included */}
                    {product.category === 'Llantas' && (
                        <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100 shadow-inner">
                            <p className="font-bold text-dark mb-3 text-sm flex items-center">
                                <CheckCircle size={16} className="text-accent mr-2" />
                                Incluido en la compra de 2 o más llantas:
                            </p>
                            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-700 font-medium">
                                <li className="flex items-center">✓ Instalación profesional</li>
                                <li className="flex items-center">✓ Balanceo computarizado</li>
                                <li className="flex items-center">✓ Válvula de seguridad</li>
                                <li className="flex items-center">✓ Inflado con Aire/Nitrógeno</li>
                            </ul>
                        </div>
                    )}
                    
                    {product.category === 'Rines' && (
                        <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100 shadow-inner">
                            <p className="font-bold text-dark flex items-center text-sm">
                                <CheckCircle size={18} className="text-accent mr-2" />
                                Instalación Profesional Incluida
                            </p>
                        </div>
                    )}

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
