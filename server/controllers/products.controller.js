const axios = require('axios');
const { getSheetData, parseSheetData } = require('../utils/googleSheets');

// Google Sheets logic moved to ../utils/googleSheets.js

/**
 * Map sheet columns to expected frontend fields
 */
const mapProductFields = (product, index) => {
    // Generate unique ID based on global index to prevent duplicates from multiple sheets
    const uniqueId = index + 1;

    // Normalize category names (fix common typos/accents)
    let category = product['category'] || 'Otros';
    if (category.toLowerCase() === 'llantas camion' || category === 'Llantas Camion') {
        category = 'Llantas Camión';
    } else if (category.toLowerCase() === 'baterias') {
        category = 'Baterías';
    }

    return {
        id: uniqueId,
        sku: product['sku'] || null,
        name: product['name'] || 'Sin nombre',
        category: category,
        sub_category: product['sub_category'] || null,
        price: parseFloat(product['price'] || 0),
        description: product['description'] || product['name'] || '',
        image_url: product['image_url'] || 'https://placehold.co/300x300?text=Producto',
        stock: parseInt(product['stock'] || 0),
        is_featured: product['is_feature'] === 1 || product['is_feature'] === true || product['is_feature'] === 'TRUE' || product['is_featured'] === true || false,
        promocion: product['promocion'] || null,
        rating: parseFloat(product['rating'] || 5.0),
        specs: product['specs'] || null
    };
};

/**
 * Helper to normalize sub-category names for consistent grouping
 */
const normalizeSubCategory = (subCat) => {
    if (!subCat) return 'Otros';
    const lower = subCat.toLowerCase().trim();
    if (lower.includes('suspension') || lower.includes('suspensión')) return 'Suspensión';
    if (lower.includes('traccion') || lower.includes('tracción')) return 'Tracción';
    if (lower.includes('direccion') || lower.includes('dirección')) return 'Dirección';
    if (lower.includes('soporte')) return 'Soportes';
    return subCat.charAt(0).toUpperCase() + subCat.slice(1);
};

// Get all products with optional filtering
exports.getProducts = async (req, res) => {
    try {
        const { category, featured } = req.query;

        // Fetch both sheets in parallel
        const [productosData, refaccionesData] = await Promise.all([
            getSheetData('PRODUCTOS'),
            getSheetData('REFACCIONES')
        ]);

        let allProducts = [];

        // Process PRODUCTOS sheet
        if (productosData) {
            const products = parseSheetData(productosData);
            allProducts = [...allProducts, ...products];
        }

        // Process REFACCIONES sheet
        if (refaccionesData) {
            const refacciones = parseSheetData(refaccionesData);
            // Ensure category is set to 'Refacciones' to fix any typos in the sheet (e.g., 'Refaciones')
            refacciones.forEach(r => {
                r.category = 'Refacciones';
            });
            allProducts = [...allProducts, ...refacciones];
        }

        // Map to expected format with a continuous index for ID if needed
        allProducts = allProducts.map((p, i) => mapProductFields(p, i));

        // Apply filters
        if (category) {
            allProducts = allProducts.filter(p => p.category === category);
        }

        if (featured === 'true') {
            allProducts = allProducts.filter(p => p.is_featured === true);
        }

        res.json(allProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);

        // Fetch all data to find the product
        // (In a real DB this would be a direct query, but with Sheets we fetch all)
        const [productosData, refaccionesData] = await Promise.all([
            getSheetData('PRODUCTOS'),
            getSheetData('REFACCIONES')
        ]);

        let allProducts = [];
        if (productosData) allProducts = [...allProducts, ...parseSheetData(productosData)];
        if (refaccionesData) allProducts = [...allProducts, ...parseSheetData(refaccionesData)];

        allProducts = allProducts.map((p, i) => mapProductFields(p, i));

        const product = allProducts.find(p => p.id === productId);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
};
