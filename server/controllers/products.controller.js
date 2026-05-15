const axios = require('axios');
const { getSheetData, parseSheetData, MAIN_SHEET_ID, PROMO_SHEET_ID } = require('../utils/googleSheets');

// Google Sheets logic moved to ../utils/googleSheets.js

/**
 * Map sheet columns to expected frontend fields
 */
const mapProductFields = (product, index) => {
    // Normalize category names (fix common typos/accents)
    let category = product['category'] || 'Otros';
    if (category.toLowerCase() === 'llantas camion' || category === 'Llantas Camion') {
        category = 'Llantas Camión';
    } else if (category.toLowerCase() === 'baterias') {
        category = 'Baterías';
    }

    // Generate unique ID based on global index to prevent duplicates from multiple sheets
    const uniqueId = `p-${index}-${product['sku'] || 'no-sku'}`;

    // New: Check for promotional flag in master sheet
    const rebajaFlag = product['producto_rebaja'] || product['PRODUCTO_REBAJA'] || 0;
    const isPromo = String(rebajaFlag) === '1';

    let price = parseFloat(product['price'] || 0);
    let oldPrice = null;
    let promoLabel = product['promocion'] || null;

    if (isPromo) {
        oldPrice = price;
        // Use normalized category for checks
        if (category.toLowerCase().includes('llanta')) {
            price = price * 0.80;
            promoLabel = 'Oferta';
        } else if (category.toLowerCase().includes('rin')) {
            price = price / 1.40;
            promoLabel = 'Oferta';
        }
    }

    return {
        id: uniqueId,
        sku: product['sku'] || product['SKU'] || null,
        name: product['name'] || product['NAME'] || product['DESCRIPCION'] || product['descripcion'] || 'Sin nombre',
        category: category,
        sub_category: product['sub_category'] || product['SUB_CATEGORY'] || null,
        price: price,
        old_price: oldPrice,
        is_promo: isPromo,
        description: product['description'] || product['DESCRIPTION'] || product['name'] || product['DESCRIPCION'] || '',
        image_url: product['image_url'] || product['IMAGE_URL'] || product['FOTO'] || product['URL'] || 'https://placehold.co/300x300?text=Producto',
        stock: parseInt(product['stock'] || product['STOCK'] || product['EXISTENCIA'] || 0),
        is_featured: product['is_feature'] === 1 || product['is_feature'] === true || product['is_feature'] === 'TRUE' || product['is_featured'] === true || product['IS_FEATURED'] === 1 || false,
        promocion: promoLabel,
        rating: parseFloat(product['rating'] || product['RATING'] || 5.0),
        specs: product['specs'] || product['SPECS'] || product['MEDIDA'] || product['medida'] || product['especificaciones'] || null
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
    console.log('GET PRODUCTS CALLED - Query:', req.query);
    try {
        const { category, featured } = req.query;

        // Fetch products from main sheets and promo sheets to ensure complete catalog
        const [productosData, refaccionesData, promoRinesData, promoLlantasData, promoBateriasData] = await Promise.all([
            getSheetData('PRODUCTOS'),
            getSheetData('REFACCIONES'),
            getSheetData('PROMOCIONES_RINES'),
            getSheetData('PROMOCIONES_LLANTAS'),
            getSheetData('PROMOCIONES_BATERIAS')
        ]);

        let allProducts = [];
        const productsMap = new Map(); // Use Map to prevent duplicates by SKU

        // 1. Process PRODUCTOS sheet
        if (productosData) {
            const products = parseSheetData(productosData);
            products.forEach((p, i) => {
                const mapped = mapProductFields(p, i);
                const sku = String(mapped.sku || '').trim().toLowerCase();
                if (sku) {
                    productsMap.set(sku, mapped);
                } else {
                    allProducts.push(mapped); // Items without SKU (unlikely but safe)
                }
            });
        }

        // 2. Process PROMOCIONES_RINES
        if (promoRinesData) {
            const promoRines = parseSheetData(promoRinesData);
            promoRines.forEach((pr, i) => {
                const sku = String(pr.SKU || pr.sku || '').trim().toLowerCase();
                if (sku) {
                    const existing = productsMap.get(sku);
                    if (existing && existing.is_promo) {
                        const specialPrice = pr['PRECIO REBAJA'] || pr['precio rebaja'] || 0;
                        if (specialPrice && parseFloat(specialPrice) > 0) {
                            existing.price = parseFloat(specialPrice);
                            existing.old_price = pr['PRECIO ANTERIOR'] || pr['precio anterior'] || existing.old_price;
                            existing.is_promo = true;
                            existing.is_special_promo = true;
                            existing.promocion = 'Oferta';
                        }
                    }
                }
            });
        }

        // 3. Process PROMOCIONES_LLANTAS
        if (promoLlantasData) {
            const promoLlantas = parseSheetData(promoLlantasData);
            promoLlantas.forEach(pl => {
                const sku = String(pl.SKU || pl.sku || '').trim().toLowerCase();
                if (sku) {
                    const existing = productsMap.get(sku);
                    if (existing && existing.is_promo) {
                        const specialPrice = pl['PRECIO REBAJA'] || pl['precio rebaja'] || pl['PRECIO PROMOCION'] || pl['precio promocion'] || 0;
                        if (specialPrice && parseFloat(specialPrice) > 0) {
                            existing.price = parseFloat(specialPrice);
                            existing.old_price = pl['PRECIO ANTERIOR'] || pl['precio anterior'] || existing.old_price;
                            existing.is_promo = true;
                            existing.is_special_promo = true;
                            existing.promocion = 'Oferta';
                        }
                    }
                }
            });
        }

        // 4. Process PROMOCIONES_BATERIAS
        if (promoBateriasData) {
            const promoBaterias = parseSheetData(promoBateriasData);
            promoBaterias.forEach(pb => {
                const sku = String(pb.SKU || pb.sku || '').trim().toLowerCase();
                if (sku) {
                    const existing = productsMap.get(sku);
                    if (existing && existing.is_promo) {
                        const specialPrice = pb['PRECIO REBAJA'] || pb['precio rebaja'] || pb['PRECIO PROMOCION'] || pb['precio promocion'] || 0;
                        if (specialPrice && parseFloat(specialPrice) > 0) {
                            existing.price = parseFloat(specialPrice);
                            existing.old_price = pb['PRECIO ANTERIOR'] || pb['precio anterior'] || existing.old_price;
                            existing.is_promo = true;
                            existing.is_special_promo = true;
                            existing.promocion = 'Oferta';
                        }
                    }
                }
            });
        }

        // 3. (REMOVED) Process specialized Rines from secondary promo sheet
        // This was causing over-matching with old/unstructured data.

        // 4. Process REFACCIONES sheet
        if (refaccionesData) {
            const refacciones = parseSheetData(refaccionesData);
            refacciones.forEach((r, i) => {
                r.category = 'Refacciones';
                const mapped = mapProductFields(r, allProducts.length + i + 1000);
                allProducts.push(mapped);
            });
        }

        // Combine all from map into the final array
        allProducts = [...allProducts, ...Array.from(productsMap.values())];

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

// Get single product by ID or SKU
exports.getProductById = async (req, res) => {
    try {
        const idOrSku = String(req.params.id);
        const isSku = idOrSku.startsWith('LLAN') || idOrSku.startsWith('RIN') || idOrSku.startsWith('REF') || idOrSku.startsWith('BAT');

        console.log(`Fetching product details for ${isSku ? 'SKU' : 'ID'}: ${idOrSku}`);

        // 1. Fetch MAIN Inventory Sheets (Order matters for ID consistency)
        const [productosData, refaccionesData] = await Promise.all([
            getSheetData('PRODUCTOS', MAIN_SHEET_ID),
            getSheetData('REFACCIONES', MAIN_SHEET_ID)
        ]);

        let combinedMain = [];
        if (productosData) combinedMain = [...combinedMain, ...parseSheetData(productosData)];
        if (refaccionesData) {
            const refacciones = parseSheetData(refaccionesData);
            refacciones.forEach(r => r.category = 'Refacciones');
            combinedMain = [...combinedMain, ...refacciones];
        }

        // Map main inventory with SAME IDs as getProducts (Index starting from 0 -> ID 1..N)
        const mainInventory = combinedMain.map((p, i) => mapProductFields(p, i));

        // 2. Fetch specialized sheets for Rines, Baterias and Promos
        const [rinesData, bateriasData, promoRinesData, promoLlantasData, promoBateriasData] = await Promise.all([
            getSheetData('Rines', PROMO_SHEET_ID),
            getSheetData('Baterias', PROMO_SHEET_ID),
            getSheetData('PROMOCIONES_RINES', MAIN_SHEET_ID),
            getSheetData('PROMOCIONES_LLANTAS', MAIN_SHEET_ID),
            getSheetData('PROMOCIONES_BATERIAS', MAIN_SHEET_ID)
        ]);

        let specializedProducts = [];

        // Process Rines (from PROMO sheet)
        if (rinesData) {
            const rows = rinesData.table.rows;
            const rinesRows = rows.slice(1).map((row, i) => {
                const cells = row.c;
                return {
                    id: `rin-${i}`,
                    sku: String(cells[3]?.v || '').trim(),
                    name: String(cells[13]?.v || '').trim(),
                    category: 'Rines',
                    price: parseFloat(cells[7]?.v || 0),
                    image_url: cells[4]?.v || cells[2]?.v || 'https://placehold.co/300x300?text=Rin',
                    stock: parseInt(cells[5]?.v || 0),
                    description: cells[13]?.v || '',
                    specs: String(cells[14]?.v || '')
                };
            });
            specializedProducts = [...specializedProducts, ...rinesRows];
        }

        // Process Baterias (from PROMO sheet)
        if (bateriasData) {
            const rows = bateriasData.table.rows;
            const bateriasRows = rows.slice(1).map((row, i) => {
                const cells = row.c;
                return {
                    id: `bat-${i}`,
                    sku: String(cells[3]?.v || '').trim(),
                    name: String(cells[13]?.v || '').trim(),
                    category: 'Baterías',
                    price: parseFloat(cells[6]?.v || 0),
                    image_url: cells[4]?.v || cells[1]?.v || 'https://placehold.co/300x300?text=Bateria',
                    stock: parseInt(cells[5]?.v || 0),
                    description: cells[13]?.v || '',
                    specs: String(cells[14]?.v || '')
                };
            });
            specializedProducts = [...specializedProducts, ...bateriasRows];
        }

        // Process Promos Llantas (from MAIN sheet)
        if (promoLlantasData) {
            const llantasPromos = parseSheetData(promoLlantasData).map((row, i) => ({
                id: `promo-llan-${i}`,
                sku: String(row.SKU || row.sku || '').trim(),
                name: row.DESCRIPCION || row.descripcion || 'Llanta Goodyear',
                category: 'Llantas',
                price: parseFloat(row['PRECIO PROMOCION'] || row['precio promocion'] || 0),
                image_url: row.image_url || row.IMAGE_URL || '',
                stock: parseInt(row.BODEGA || row.bodega || 0),
                description: row.DESCRIPCION || row.descripcion || '',
                specs: row.MEDIDA || row.medida || null,
                is_promo: true
            }));
            specializedProducts = [...specializedProducts, ...llantasPromos];
        }

        // Process Promos Baterias (from MAIN sheet)
        if (promoBateriasData) {
            const bateriasPromos = parseSheetData(promoBateriasData).map((row, i) => ({
                id: `promo-bat-${i}`,
                sku: String(row.SKU || row.sku || '').trim(),
                name: row.DESCRIPCION || row.descripcion || 'Batería Automotriz',
                category: 'Baterías',
                price: parseFloat(row['PRECIO REBAJA'] || row['precio promocion'] || 0),
                image_url: row.image_url || row.IMAGE_URL || '',
                stock: parseInt(row.EXISTENCIA || row.bodega || 0),
                description: row.DESCRIPCION || row.descripcion || '',
                specs: row.MEDIDA || row.medida || null,
                is_promo: true
            }));
            specializedProducts = [...specializedProducts, ...bateriasPromos];
        }

        // 3. COMBINE ALL for lookup
        const allProducts = [...mainInventory, ...specializedProducts];

        // Improved lookup: Try multiple ways to find the product
        let product = allProducts.find(p => String(p.sku || '').trim().toLowerCase() === idOrSku.toLowerCase());

        if (!product) {
            // Try matching whole ID string (useful for p-index-SKU format)
            product = allProducts.find(p => String(p.id).toLowerCase() === idOrSku.toLowerCase());
        }

        if (!product && !isNaN(parseInt(idOrSku))) {
            // Try matching numeric ID (fallback for old system)
            const numericId = parseInt(idOrSku);
            product = allProducts.find(p => p.id === numericId);
        }

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // SPECIAL OVERRIDE FOR LLANTAS: If found in PROMOCIONES_LLANTAS, update price
        if ((product.category === 'Llantas' || idOrSku.startsWith('LLAN')) && promoLlantasData) {
            const promoLlantas = parseSheetData(promoLlantasData);
            const promoInfo = promoLlantas.find(pl => {
                const rowSku = pl.SKU || pl.sku;
                return String(rowSku || '').trim().toLowerCase() === String(product.sku || '').toLowerCase();
            });

            if (promoInfo) {
                const precioPromocion = promoInfo['PRECIO PROMOCIÓN'] || promoInfo['PRECIO PROMOCION'] || promoInfo['precio promocion'] || 0;
                const desc20 = promoInfo['DESC.20%'] || promoInfo['desc.20%'] || 0;
                
                let p = parseFloat(desc20 || 0);
                let op = parseFloat(precioPromocion || 0);
                
                if (p === 0 && op > 0) p = op * 0.80;
                
                if (p > 0) {
                    product.price = p;
                    product.old_price = op > 0 ? op : product.price;
                    product.is_promo = true;
                    product.promocion = '4x3';
                } else if (op > 0) {
                    product.price = op;
                    product.old_price = promoInfo['PRECIO ANTERIOR'] || promoInfo['precio anterior'] || product.price;
                    product.is_promo = true;
                    product.promocion = '4x3';
                }
            }
        }

        // SPECIAL OVERRIDE FOR RINES: If found in PROMOCIONES_RINES, update price
        if ((product.category === 'Rines' || idOrSku.startsWith('RIN')) && promoRinesData) {
            const promoRines = parseSheetData(promoRinesData);
            const promoInfo = promoRines.find(pr => {
                const rowSku = pr.SKU || pr.sku;
                return String(rowSku || '').trim().toLowerCase() === String(product.sku || '').toLowerCase();
            });

            if (promoInfo) {
                const specialPrice = promoInfo['PRECIO REBAJA'] || promoInfo['precio rebaja'] || 0;
                if (specialPrice && parseFloat(specialPrice) > 0) {
                    product.price = parseFloat(specialPrice);
                    product.old_price = promoInfo['PRECIO ANTERIOR'] || promoInfo['precio anterior'] || product.price;
                    product.is_promo = true;
                    product.promocion = 'Oferta';
                }
            }
        }

        // SPECIAL OVERRIDE FOR BATERIAS: If found in PROMOCIONES_BATERIAS, update price
        if ((product.category === 'Baterías' || idOrSku.startsWith('BAT')) && promoBateriasData) {
            const promoBaterias = parseSheetData(promoBateriasData);
            const promoInfo = promoBaterias.find(pb => {
                const rowSku = pb.SKU || pb.sku;
                return String(rowSku || '').trim().toLowerCase() === String(product.sku || '').toLowerCase();
            });

            if (promoInfo) {
                const specialPrice = promoInfo['PRECIO REBAJA'] || promoInfo['precio rebaja'] || promoInfo['PRECIO PROMOCION'] || promoInfo['precio promocion'] || 0;
                if (specialPrice && parseFloat(specialPrice) > 0) {
                    product.price = parseFloat(specialPrice);
                    product.old_price = promoInfo['PRECIO ANTERIOR'] || promoInfo['precio anterior'] || product.price;
                    product.is_promo = true;
                    product.promocion = 'Oferta';
                }
            }
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product detail:', error);
        res.status(500).json({ message: 'Error al obtener el detalle del producto', error: error.message });
    }
};


// Get promo products from PROMOCIONES_LLANTAS and PROMOCIONES_RINES tabs
exports.getPromotions = async (req, res) => {
    console.log('GET PROMOTIONS CALLED (MAIN SHEET TABS)');
    try {
        console.log('Fetching promotion products from PROMOCIONES_LLANTAS and PROMOCIONES_RINES...');

        // Fetch data parallelly
        const [productosData, promoLlantasData, promoRinesData, promoBateriasData] = await Promise.all([
            getSheetData('PRODUCTOS', MAIN_SHEET_ID),
            getSheetData('PROMOCIONES_LLANTAS', MAIN_SHEET_ID),
            getSheetData('PROMOCIONES_RINES', MAIN_SHEET_ID),
            getSheetData('PROMOCIONES_BATERIAS', MAIN_SHEET_ID)
        ]);

        if (!promoLlantasData && !promoRinesData && !promoBateriasData) {
            return res.status(404).json({ message: 'No se encontraron las hojas de promociones' });
        }

        // Map main products to get image URLs by SKU
        const productsMap = new Map();
        let mainProductsPromos = [];

        if (productosData) {
            const productsRows = parseSheetData(productosData);
            productsRows.forEach(p => {
                const sku = p.SKU || p.sku;
                if (sku) productsMap.set(String(sku).trim().toLowerCase(), p);

                // If it's a "rebaja" product, add it to the promotions list automatically
                const rebajaFlag = p['producto_rebaja'] || p['PRODUCTO_REBAJA'] || 0;
                if (String(rebajaFlag) === '1') {
                    let discountDivisor = 1.0;
                    const cat = (p.category || '').toLowerCase();
                    if (cat.includes('llanta')) discountDivisor = 0.80;
                    else if (cat.includes('rin')) discountDivisor = 1.40;

                    const price = parseFloat(p.price || 0);
                    mainProductsPromos.push({
                        id: `promo-main-${p.id || sku}`,
                        sku: sku,
                        name: p.name || 'Producto en Oferta',
                        category: p.category || 'Varios',
                        price: price / discountDivisor,
                        old_price: price,
                        image_url: p.image_url || p.FOTO || p.URL || p.foto || '',
                        stock: parseInt(p.stock || 0),
                        promocion: 'Oferta',
                        specs: p.specs || null,
                        rating: parseFloat(p.rating || 4.5),
                        is_promo: true
                    });
                }
            });
        }

        let allPromos = [...mainProductsPromos];

        // 1. Process PROMOCIONES_LLANTAS
        if (promoLlantasData) {
            const llantasRows = parseSheetData(promoLlantasData);
            const llantasPromos = llantasRows.map((row, i) => {
                const sku = String(row.SKU || row.sku || '').trim();
                const mainInfo = productsMap.get(sku.toLowerCase()) || {};

                // Helper to find value by multiple possible header names
                const getValue = (keys) => {
                    for (const key of keys) {
                        if (row[key] !== undefined && row[key] !== null) return row[key];
                    }
                    return null;
                };

                // If already added via rebajaFlag, skip to avoid duplicates
                if (mainProductsPromos.some(p => p.sku === sku)) return null;

                const precioPromocion = getValue(['PRECIO PROMOCIÓN', 'PRECIO PROMOCION', 'precio promocion', 'ECIO PROMOCI']);
                const desc20 = getValue(['DESC.20%', 'desc.20%']);
                const precioAnterior = getValue(['PRECIO ANTERIOR', 'precio anterior', 'RECIO ANTERIC', 'ANTERIOR']);
                
                let p = parseFloat(desc20 || 0);
                let op = parseFloat(precioPromocion || 0);
                
                // If DESC.20% doesn't exist, calculate it from PRECIO PROMOCIÓN
                if (p === 0 && op > 0) p = op * 0.80;
                
                // If PRECIO PROMOCIÓN doesn't exist, fallback to old logic
                if (op === 0) {
                    p = parseFloat(getValue(['PRECIO PROMOCION', 'precio promocion', 'PRECIO PROMOCIÓN', 'ECIO PROMOCI', 'PROMOCION', 'PRECIO']) || 0);
                    op = parseFloat(precioAnterior || 0);
                }

                return {
                    id: `promo-llan-${i}`,
                    sku: sku,
                    name: getValue(['DESCRIPCION', 'descripcion', 'DESCRIPCIÓN', 'NAME', 'name']) || mainInfo.name || 'Llanta Goodyear',
                    category: 'Llantas',
                    price: p,
                    old_price: op,
                    image_url: getValue(['image_url', 'IMAGE_URL', 'FOTO', 'foto', 'URL', 'url']) || mainInfo.image_url || mainInfo.FOTO || mainInfo.URL || mainInfo.foto || '',
                    stock: parseInt(getValue(['BODEGA', 'bodega', 'EXISTENCIA', 'existencia', 'STOCK', 'stock']) || 0),
                    promocion: '4x3',
                    specs: getValue(['MEDIDA', 'medida', 'SPECS', 'specs']) || mainInfo.specs || null,
                    rating: 4.5
                };
            }).filter(p => p && p.sku);
            allPromos = [...allPromos, ...llantasPromos];
        }

        // 2. Process PROMOCIONES_RINES
        if (promoRinesData) {
            const rinesRows = parseSheetData(promoRinesData);
            const rinesPromos = rinesRows.map((row, i) => {
                const sku = String(row.SKU || row.sku || '').trim();
                const mainInfo = productsMap.get(sku.toLowerCase()) || {};

                const getValue = (keys) => {
                    for (const key of keys) {
                        if (row[key] !== undefined && row[key] !== null) return row[key];
                    }
                    return null;
                };

                // If already added via rebajaFlag, skip to avoid duplicates
                if (mainProductsPromos.some(p => p.sku === sku)) return null;

                const priceValue = getValue(['PRECIO REBAJA', 'precio rebaja', 'PRECIO PROMOCION', 'ECIO PROMOCI', 'PRECIO']);
                const oldPriceValue = getValue(['PRECIO ANTERIOR', 'precio anterior', 'RECIO ANTERIC', 'ANTERIOR']);

                return {
                    id: `promo-rin-${i}`,
                    sku: sku,
                    name: getValue(['DESCRIPCION', 'descripcion', 'DESCRIPCIÓN', 'NAME', 'name']) || mainInfo.name || 'Rin Deportivo',
                    category: 'Rines',
                    price: parseFloat(priceValue || 0),
                    old_price: parseFloat(oldPriceValue || 0),
                    image_url: getValue(['image_url', 'IMAGE_URL', 'FOTO', 'foto', 'URL', 'url']) || mainInfo.image_url || mainInfo.FOTO || mainInfo.URL || mainInfo.foto || '',
                    stock: parseInt(getValue(['EXISTENCIA', 'existencia', 'BODEGA', 'bodega', 'STOCK', 'stock']) || 0),
                    promocion: 'Oferta',
                    specs: getValue(['MEDIDA', 'medida', 'SPECS', 'specs']) || mainInfo.specs || null,
                    rating: 4.8
                };
            }).filter(r => r && r.sku);
            allPromos = [...allPromos, ...rinesPromos];
        }

        // 3. Process PROMOCIONES_BATERIAS
        if (promoBateriasData) {
            const bateriasRows = parseSheetData(promoBateriasData);
            const bateriasPromos = bateriasRows.map((row, i) => {
                const sku = String(row.SKU || row.sku || '').trim();
                const mainInfo = productsMap.get(sku.toLowerCase()) || {};

                const getValue = (keys) => {
                    for (const key of keys) {
                        if (row[key] !== undefined && row[key] !== null) return row[key];
                    }
                    return null;
                };

                // If already added via rebajaFlag, skip to avoid duplicates
                if (mainProductsPromos.some(p => p.sku === sku)) return null;

                const priceValue = getValue(['PRECIO REBAJA', 'precio rebaja', 'PRECIO PROMOCION', 'precio promocion', 'ECIO PROMOCI', 'PRECIO']);
                const oldPriceValue = getValue(['PRECIO ANTERIOR', 'precio anterior', 'RECIO ANTERIC', 'ANTERIOR']);

                return {
                    id: `promo-bat-${i}`,
                    sku: sku,
                    name: getValue(['DESCRIPCION', 'descripcion', 'DESCRIPCIÓN', 'NAME', 'name']) || mainInfo.name || 'Batería Automotriz',
                    category: 'Baterías',
                    price: parseFloat(priceValue || 0),
                    old_price: parseFloat(oldPriceValue || 0),
                    image_url: getValue(['image_url', 'IMAGE_URL', 'FOTO', 'foto', 'URL', 'url']) || mainInfo.image_url || mainInfo.FOTO || mainInfo.URL || mainInfo.foto || '',
                    stock: parseInt(getValue(['EXISTENCIA', 'existencia', 'BODEGA', 'bodega', 'STOCK', 'stock']) || 0),
                    promocion: 'Oferta',
                    specs: getValue(['MEDIDA', 'medida', 'SPECS', 'specs']) || mainInfo.specs || null,
                    rating: 4.8
                };
            }).filter(b => b && b.sku);
            allPromos = [...allPromos, ...bateriasPromos];
        }

        res.json(allPromos);
    } catch (error) {
        console.error('Error fetching promotion products:', error);
        res.status(500).json({ message: 'Error al obtener promociones', error: error.message });
    }
};
