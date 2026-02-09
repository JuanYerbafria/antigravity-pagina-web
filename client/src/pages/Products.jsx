import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import { Search, Tag, Wrench, Disc, Share2, Maximize2, Minimize2 } from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState('Llantas');
    const [loading, setLoading] = useState(true);

    // Measurement search state
    const [activeTab, setActiveTab] = useState('auto');
    const [searchParams, setSearchParams] = useState({
        ancho: '',
        perfil: '',
        rin: '',
        medida: ''
    });
    const [isSearching, setIsSearching] = useState(false);

    // Refacciones State
    const [activeRefaccionesTab, setActiveRefaccionesTab] = useState('Suspensión');
    const [selectedRefaccionType, setSelectedRefaccionType] = useState(null);
    const [refaccionesConfig, setRefaccionesConfig] = useState({});

    // Normalize sub-categories helper
    const normalizeSubCategory = (subCat) => {
        if (!subCat) return 'Otros';
        const lower = subCat.toLowerCase().trim();
        if (lower.includes('suspension') || lower.includes('suspensión')) return 'Suspensión';
        if (lower.includes('traccion') || lower.includes('tracción')) return 'Tracción';
        if (lower.includes('direccion') || lower.includes('dirección')) return 'Dirección';
        if (lower.includes('soporte')) return 'Soportes';
        return subCat.charAt(0).toUpperCase() + subCat.slice(1);
    };

    const categories = ['Llantas', 'Llantas Camión', 'Rines', 'Baterías', 'Refacciones', 'Materiales', 'Accesorios', 'Otros'];
    const { category: urlCategory } = useParams();

    const categoryMap = {
        'llantas': 'Llantas',
        'llantas-camion': 'Llantas Camión',
        'rines': 'Rines',
        'baterias': 'Baterías',
        'refacciones': 'Refacciones',
        'materiales': 'Materiales',
        'accesorios': 'Accesorios',
        'otros': 'Otros'
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                const allProducts = response.data;
                setProducts(allProducts);
                setFilteredProducts(allProducts);

                // Build Refacciones Config dynamically
                const refaccionesData = allProducts.filter(p => p.category === 'Refacciones');
                const config = {};

                refaccionesData.forEach(item => {
                    const subCat = normalizeSubCategory(item.sub_category);
                    if (!config[subCat]) {
                        config[subCat] = [];
                    }
                    // Only add if not already present (avoid duplicates if sheet has multiples)
                    // We treat these items as "Types" or "Categories" themselves if they are from the REFACCIONES sheet
                    // Ideally the REFACCIONES sheet items ARE the types (e.g. name="Amortiguadores")
                    if (!config[subCat].find(x => x.name === item.name)) {
                        config[subCat].push({
                            name: item.name,
                            keyword: item.name.toLowerCase(), // Use name as keyword for filtering
                            image: item.image_url || 'https://via.placeholder.com/300x200?text=' + item.name
                        });
                    }
                });

                // Ensure we have the standard keys if they don't exist, or just rely on what we found
                setRefaccionesConfig(config);

                // Set initial active tab if config has keys
                if (Object.keys(config).length > 0 && !config['Suspensión']) {
                    setActiveRefaccionesTab(Object.keys(config)[0]);
                } else if (config['Suspensión']) {
                    setActiveRefaccionesTab('Suspensión');
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Sync category with URL
    useEffect(() => {
        if (urlCategory && categoryMap[urlCategory.toLowerCase()]) {
            setCategory(categoryMap[urlCategory.toLowerCase()]);
        } else if (!urlCategory) {
            setCategory('Llantas');
        }
    }, [urlCategory]);

    useEffect(() => {
        if (!isSearching) {
            if (category === 'Refacciones') {
                if (selectedRefaccionType) {
                    setFilteredProducts(products.filter(p =>
                        p.category === 'Refacciones' &&
                        (p.name.toLowerCase().includes(selectedRefaccionType.keyword) ||
                            (p.specs && p.specs.toLowerCase().includes(selectedRefaccionType.keyword)))
                    ));
                } else {
                    setFilteredProducts(products.filter(p => p.category === 'Refacciones'));
                }
            } else {
                setFilteredProducts(products.filter(p => p.category === category));
            }
        }
    }, [category, products, isSearching, selectedRefaccionType]);





    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = () => {
        setIsSearching(true);

        if (category === 'Rines') {
            const rinesRin = searchParams.rin ? searchParams.rin.toString().toLowerCase() : '';
            const rinesMedida = searchParams.medida ? searchParams.medida.toString().toLowerCase() : '';

            if (!rinesRin && !rinesMedida) {
                // No filters, show all Rines
                setFilteredProducts(products.filter(p => p.category === 'Rines'));
                setIsSearching(false);
                return;
            }

            const filtered = products.filter(product => {
                if (product.category !== 'Rines') return false;
                if (!product.specs) return false;

                const specs = product.specs.toLowerCase();

                // Check Rin (e.g. "13") - Use regex to avoid partial matches like "14" finding "114"
                // Matches if "14" is at start/end or surrounded by non-digits (like "R14", "14X", " 14 ")
                let matchesRin = true;
                if (rinesRin) {
                    // Escape special regex chars just in case
                    const escapedRin = rinesRin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    // Look for the rin number preceded by start-of-string or non-digit, AND followed by end-of-string or non-digit
                    const rinRegex = new RegExp(`(^|\\D)${escapedRin}(\\D|$)`, 'i');
                    matchesRin = rinRegex.test(specs);
                }

                // Check Medida (e.g. "4x100") - Keep simple inclusion or refine similarly if needed.
                const matchesMedida = rinesMedida ? specs.includes(rinesMedida) : true;

                return matchesRin && matchesMedida;
            });
            setFilteredProducts(filtered);
            return;
        }

        if (!searchParams.ancho && !searchParams.perfil && !searchParams.rin) {
            // Clear search, show all for current category
            setIsSearching(false);
            return;
        }

        // Only auto-select Llantas if we're not already in a specific tire category
        if (category !== 'Llantas' && category !== 'Llantas Camión') {
            setCategory('Llantas');
        }

        const filtered = products.filter(product => {
            if (!product.specs) return false;

            const specs = product.specs.toString().toLowerCase();
            const ancho = searchParams.ancho ? specs.includes(searchParams.ancho) : true;
            const perfil = searchParams.perfil ? specs.includes(searchParams.perfil) : true;
            const rin = searchParams.rin ? specs.includes(searchParams.rin) : true;

            return ancho && perfil && rin;
        });

        setFilteredProducts(filtered);
    };

    const clearSearch = () => {
        setSearchParams({ ancho: '', perfil: '', rin: '', medida: '' });
        setIsSearching(false);
        // We keep the current category state; synchronizing with the URL
        // will happen automatically if the URL changes, otherwise we stay where we are.
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <Helmet>
                <title>{urlCategory ? `${categoryMap[urlCategory.toLowerCase()]} | 4x3 y 25% Descuento | Grupo Noguez` : 'Llantas 4x3 y 25% de Descuento | Grupo Llantero Noguez'}</title>
                <meta
                    name="description"
                    content={urlCategory
                        ? `Aprovecha 4x3 y 25% de descuento en ${categoryMap[urlCategory.toLowerCase()]} en Querétaro. Encuentra rines, refacciones y llantas en Grupo Llantero Noguez.`
                        : "Aprovecha nuestra promoción 4x3 y 25% de descuento en llantas, rines, baterías y refacciones en Querétaro. Servicio experto y las mejores marcas."
                    }
                />
                <meta property="og:title" content={urlCategory ? `${categoryMap[urlCategory.toLowerCase()]} | Promoción 4x3` : 'Llantas 4x3 y 25% de Descuento'} />
                <meta property="og:description" content={urlCategory ? `Aprovecha 4x3 y 25% de descuento en ${categoryMap[urlCategory.toLowerCase()]}. Todo en refacciones y llantas en Querétaro.` : 'Las mejores promociones en llantas, rines y refacciones en Querétaro.'} />
            </Helmet>
            <h1 className="text-4xl font-bold text-center mb-12 text-primary uppercase tracking-wider">
                {urlCategory ? category : 'Nuestros Productos'}
            </h1>

            {/* Measurement Search Box - Condition: Llantas, Llantas Camión */}
            {['Llantas', 'Llantas Camión'].includes(category) && (
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('auto')}
                            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === 'auto'
                                ? 'text-primary border-b-2 border-primary bg-gray-50'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <Tag size={20} />
                                <span>Por medida auto y camioneta</span>
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('camion')}
                            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === 'camion'
                                ? 'text-primary border-b-2 border-primary bg-gray-50'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <Wrench size={20} />
                                <span>Por medida camión</span>
                            </div>
                        </button>
                    </div>

                    {/* Search Form - Auto/Camioneta */}
                    {activeTab === 'auto' && (
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <div className="flex">
                                        <div className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg p-3 flex items-center justify-center min-w-[50px]">
                                            <Maximize2 size={24} className="text-gray-600" />
                                        </div>
                                        <input
                                            type="text"
                                            name="ancho"
                                            placeholder="Ancho (ej: 205)"
                                            value={searchParams.ancho}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex">
                                        <div className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg p-3 flex items-center justify-center min-w-[50px]">
                                            <Minimize2 size={24} className="text-gray-600" />
                                        </div>
                                        <input
                                            type="text"
                                            name="perfil"
                                            placeholder="Perfil (ej: 60)"
                                            value={searchParams.perfil}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex">
                                        <div className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg p-3 flex items-center justify-center min-w-[50px]">
                                            <Disc size={24} className="text-gray-600" />
                                        </div>
                                        <input
                                            type="text"
                                            name="rin"
                                            placeholder="Rin (ej: 16)"
                                            value={searchParams.rin}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={handleSearch}
                                        className="w-full bg-accent hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center space-x-2 transition-colors"
                                    >
                                        <Search size={20} />
                                        <span>Buscar</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Search Form - Camión */}
                    {activeTab === 'camion' && (
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <div className="flex">
                                        <div className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg p-3 flex items-center justify-center min-w-[50px]">
                                            <Maximize2 size={24} className="text-gray-600" />
                                        </div>
                                        <input
                                            type="text"
                                            name="ancho"
                                            placeholder="Ancho (ej: 11)"
                                            value={searchParams.ancho}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex">
                                        <div className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg p-3 flex items-center justify-center min-w-[50px]">
                                            <Disc size={24} className="text-gray-600" />
                                        </div>
                                        <input
                                            type="text"
                                            name="rin"
                                            placeholder="Rin (ej: 22.5)"
                                            value={searchParams.rin}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={handleSearch}
                                        className="w-full bg-accent hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center space-x-2 transition-colors"
                                    >
                                        <Search size={20} />
                                        <span>Buscar</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Rines Search Box */}
            {category === 'Rines' && (
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                    {/* Header bar similar to tabs */}
                    <div className="flex border-b border-gray-200">
                        <div className="flex-1 py-4 px-6 text-center font-medium text-primary border-b-2 border-primary bg-gray-50">
                            <div className="flex items-center justify-center space-x-2">
                                <Search size={20} />
                                <span>Buscar Rines por medida</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Input Rin */}
                            <div className="flex">
                                <div className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg p-3 flex items-center justify-center min-w-[50px]">
                                    <Disc size={20} className="text-gray-600" />
                                </div>
                                <input
                                    type="text"
                                    name="rin"
                                    placeholder="Rin (ej: 13)"
                                    value={searchParams.rin}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            {/* Input Medida */}
                            <div className="flex">
                                <div className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg p-3 flex items-center justify-center min-w-[50px]">
                                    <Share2 size={20} className="text-gray-600" />
                                </div>
                                <input
                                    type="text"
                                    name="medida"
                                    placeholder="Barrenación (ej: 4X100)"
                                    value={searchParams.medida}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            <div>
                                <button
                                    onClick={handleSearch}
                                    className="w-full bg-accent hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center space-x-2 transition-colors shadow-md"
                                >
                                    <Search size={20} />
                                    <span>Buscar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Search Status */}
            {isSearching && (
                <div className="text-center mb-4">
                    <span className="text-gray-600">
                        Mostrando {filteredProducts.length} resultados para:
                        {searchParams.ancho && ` Ancho: ${searchParams.ancho}`}
                        {searchParams.perfil && ` Perfil: ${searchParams.perfil}`}
                        {searchParams.rin && ` Rin: ${searchParams.rin}`}
                    </span>
                    <button
                        onClick={clearSearch}
                        className="ml-4 text-accent hover:underline font-medium"
                    >
                        Limpiar búsqueda
                    </button>
                </div>
            )}



            {/* Refacciones Custom View */}
            {category === 'Refacciones' && !loading && !isSearching ? (
                <div className="mb-8">
                    {/* Tabs */}
                    <div className="flex flex-wrap border-b border-gray-200 mb-6 bg-white rounded-t-lg">
                        {Object.keys(refaccionesConfig).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setActiveRefaccionesTab(tab);
                                    setSelectedRefaccionType(null); // Reset filtering when switching tabs
                                }}
                                className={`px-6 py-4 font-medium text-lg transition-colors ${activeRefaccionesTab === tab
                                    ? 'text-primary border-b-2 border-primary bg-gray-50'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {!selectedRefaccionType ? (
                        /* Sub-category Grid */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {refaccionesConfig[activeRefaccionesTab]?.map((item) => (
                                <div
                                    key={item.name}
                                    onClick={() => setSelectedRefaccionType(item)}
                                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100 group cursor-pointer"
                                >
                                    <div className="h-48 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4 text-center border-t border-gray-100 pb-6">
                                        <h3 className="font-bold text-gray-800 uppercase tracking-wide group-hover:text-primary transition-colors">
                                            {item.name}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Filtered Results Header */
                        <div className="mb-6">
                            <button
                                onClick={() => setSelectedRefaccionType(null)}
                                className="flex items-center text-gray-600 hover:text-primary mb-4 transition-colors"
                            >
                                <span className="mr-2">←</span> Volver a categorías de {activeRefaccionesTab}
                            </button>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {selectedRefaccionType.name}
                            </h2>
                        </div>
                    )}
                </div>
            ) : null}

            {/* Products Grid - Only show if standard category OR (Refacciones AND type selected) */}
            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                </div>
            ) : (
                (category !== 'Refacciones' || selectedRefaccionType) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-4 text-center py-12 text-gray-500">
                                {category === 'Refacciones'
                                    ? `No se encontraron refacciones de tipo "${selectedRefaccionType?.name}"`
                                    : "No se encontraron productos con esas especificaciones."}
                            </div>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default Products;
