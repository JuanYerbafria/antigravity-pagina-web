import React, { useState } from 'react';
import { Search, Tag, Wrench, ArrowUpDown } from 'lucide-react';
import axios from 'axios';

const TireSearch = () => {
    const [activeTab, setActiveTab] = useState('auto');
    const [searchParams, setSearchParams] = useState({
        ancho: '',
        perfil: '',
        rin: ''
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleSearch = async () => {
        if (!searchParams.ancho && !searchParams.perfil && !searchParams.rin) {
            alert('Por favor ingresa al menos un parámetro de búsqueda');
            return;
        }

        setLoading(true);
        setSearched(true);
        setCurrentPage(1); // Reset to first page on new search

        try {
            const params = new URLSearchParams();
            if (searchParams.ancho) params.append('ancho', searchParams.ancho);
            if (searchParams.perfil) params.append('perfil', searchParams.perfil);
            if (searchParams.rin) params.append('rin', searchParams.rin);

            const response = await axios.get(`http://localhost:3001/api/inventory/search?${params.toString()}`);

            if (response.data.success) {
                setResults(response.data.data);
            } else {
                setResults([]);
            }
        } catch (error) {
            console.error('Error searching:', error);
            alert('Error al buscar. Por favor intenta de nuevo.');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const sortedResults = React.useMemo(() => {
        let sortableItems = [...results];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                // Handle numbers for P.U
                if (sortConfig.key === 'P.U') {
                    aValue = typeof aValue === 'string' ? parseFloat(aValue.replace(/[^0-9.-]+/g, "")) : aValue;
                    bValue = typeof bValue === 'string' ? parseFloat(bValue.replace(/[^0-9.-]+/g, "")) : bValue;
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [results, sortConfig]);

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-primary mb-3">Elige la llanta perfecta para ti</h2>
                    <p className="text-gray-600 text-lg">Tu viaje empieza con la llanta ideal</p>
                    <p className="text-gray-600 text-sm mt-2">Si deseas adquirir llantas al mayoreo, puedes solicitar tu cotización haciendo clic en el ícono “Cotiza”</p>
                </div>

                {/* Search Box */}
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
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

                    {/* Search Form - Por Medida Auto/Camioneta */}
                    {activeTab === 'auto' && (
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        name="ancho"
                                        placeholder="Ancho (ej: 205)"
                                        value={searchParams.ancho}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="perfil"
                                        placeholder="Perfil (ej: 60)"
                                        value={searchParams.perfil}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="rin"
                                        placeholder="Rin (ej: 16)"
                                        value={searchParams.rin}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <button
                                        onClick={handleSearch}
                                        disabled={loading}
                                        className="w-full bg-accent hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Search size={20} />
                                        <span>{loading ? 'Buscando...' : 'Buscar'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Search Form - Por Medida Camión */}
                    {activeTab === 'camion' && (
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        name="ancho"
                                        placeholder="Ancho (ej: 11)"
                                        value={searchParams.ancho}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="rin"
                                        placeholder="Rin (ej: 22.5)"
                                        value={searchParams.rin}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <button
                                        onClick={handleSearch}
                                        disabled={loading}
                                        className="w-full bg-accent hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Search size={20} />
                                        <span>{loading ? 'Buscando...' : 'Buscar'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Search Results */}
                {searched && (
                    <div className="max-w-6xl mx-auto mt-8">
                        {loading ? (
                            <div className="text-center py-8">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                <p className="mt-4 text-gray-600">Buscando productos...</p>
                            </div>
                        ) : results.length > 0 ? (
                            <div>
                                <h3 className="text-2xl font-bold text-primary mb-4">
                                    Resultados de búsqueda ({results.length})
                                </h3>
                                <div className="bg-white rounded-lg shadow overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-accent text-white">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-sm font-bold">DESCRIPCIÓN</th>
                                                    <th
                                                        className="group px-4 py-3 text-left text-sm font-bold cursor-pointer hover:bg-white/10 transition-all duration-200 flex items-center gap-2 select-none"
                                                        onClick={() => requestSort('P.U')}
                                                    >
                                                        P.U
                                                        <ArrowUpDown
                                                            size={16}
                                                            className={`transition-colors duration-200 ${sortConfig.key === 'P.U'
                                                                ? 'text-white opacity-100'
                                                                : 'text-white/50 group-hover:text-white group-hover:opacity-100'
                                                                }`}
                                                        />
                                                    </th>
                                                    <th className="px-4 py-3 text-center text-sm font-bold">EXISTENCIA</th>
                                                    <th className="px-4 py-3 text-left text-sm font-bold">DESC 25%</th>
                                                    <th className="px-4 py-3 text-left text-sm font-bold">PROM 4X3</th>
                                                    <th className="px-4 py-3 text-left text-sm font-bold">BODEGA</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {sortedResults
                                                    .slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage)
                                                    .map((result, index) => (
                                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-4 py-3 text-sm text-gray-900 font-medium">{result.DESCRIPCION || '-'}</td>
                                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                                {result['P.U'] ? (
                                                                    typeof result['P.U'] === 'number'
                                                                        ? `$${result['P.U'].toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                                                        : result['P.U']
                                                                ) : '-'}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm text-center">
                                                                {result.EXISTENCIA !== null && result.EXISTENCIA !== undefined ? (
                                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${typeof result.EXISTENCIA === 'number' && result.EXISTENCIA > 0
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : typeof result.EXISTENCIA === 'string' && result.EXISTENCIA.includes('+')
                                                                            ? 'bg-green-100 text-green-800'
                                                                            : 'bg-gray-100 text-gray-800'
                                                                        }`}>
                                                                        {result.EXISTENCIA}
                                                                    </span>
                                                                ) : '-'}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                                {result['DESC.25%'] && result['DESC.25%'] !== 0 && result['DESC.25%'] !== '0' ? (
                                                                    typeof result['DESC.25%'] === 'number'
                                                                        ? `$${result['DESC.25%'].toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                                                        : result['DESC.25%']
                                                                ) : 'NO APLICA'}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                                {result['PROM.4X3'] && result['PROM.4X3'] !== 0 && result['PROM.4X3'] !== '0' ? (
                                                                    typeof result['PROM.4X3'] === 'number'
                                                                        ? `$${result['PROM.4X3'].toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                                                        : result['PROM.4X3']
                                                                ) : 'NO APLICA'}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm text-gray-900">{result.BODEGA || '-'}</td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Pagination Controls */}
                                {results.length > resultsPerPage && (
                                    <div className="flex justify-center items-center mt-6 space-x-2">
                                        {/* Primero */}
                                        <button
                                            onClick={() => setCurrentPage(1)}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Primero
                                        </button>

                                        {/* Anterior */}
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Anterior
                                        </button>

                                        {/* Page Numbers */}
                                        {(() => {
                                            const totalPages = Math.ceil(results.length / resultsPerPage);
                                            const pages = [];
                                            const maxPagesToShow = 5;
                                            let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
                                            let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

                                            if (endPage - startPage < maxPagesToShow - 1) {
                                                startPage = Math.max(1, endPage - maxPagesToShow + 1);
                                            }

                                            for (let i = startPage; i <= endPage; i++) {
                                                pages.push(
                                                    <button
                                                        key={i}
                                                        onClick={() => setCurrentPage(i)}
                                                        className={`px-4 py-2 text-sm font-medium rounded-md ${currentPage === i
                                                            ? 'bg-accent text-white'
                                                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {i}
                                                    </button>
                                                );
                                            }
                                            return pages;
                                        })()}

                                        {/* Siguiente */}
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(results.length / resultsPerPage)))}
                                            disabled={currentPage === Math.ceil(results.length / resultsPerPage)}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Siguiente
                                        </button>

                                        {/* Último */}
                                        <button
                                            onClick={() => setCurrentPage(Math.ceil(results.length / resultsPerPage))}
                                            disabled={currentPage === Math.ceil(results.length / resultsPerPage)}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Último
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow p-8 text-center">
                                <p className="text-gray-600 text-lg">No se encontraron productos con esas especificaciones.</p>
                                <p className="text-gray-500 mt-2">Intenta con otros parámetros de búsqueda.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TireSearch;
