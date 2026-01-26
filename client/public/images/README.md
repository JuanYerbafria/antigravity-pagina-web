# Carpeta de Imágenes

Esta carpeta contiene todas las imágenes del proyecto organizadas por categoría.

## Estructura de carpetas:

- **productos/** - Imágenes de productos (llantas, rines, refacciones, etc.)
- **servicios/** - Imágenes relacionadas con los servicios
- **blog/** - Imágenes para artículos del blog
- **general/** - Imágenes generales (logos, banners, fondos, etc.)

## Cómo usar las imágenes:

### En componentes React:
```jsx
// Para imágenes en la carpeta public
<img src="/images/productos/llanta1.jpg" alt="Llanta" />
```

### Formatos recomendados:
- **Productos**: JPG/PNG (optimizadas, máx 500KB)
- **Logos**: PNG con transparencia
- **Banners**: JPG (optimizados para web)
- **Iconos**: SVG (preferible) o PNG

## Optimización:
Se recomienda optimizar todas las imágenes antes de subirlas usando herramientas como:
- TinyPNG (https://tinypng.com/)
- Squoosh (https://squoosh.app/)
- ImageOptim (para Mac)

## Nombres de archivo:
Usar nombres descriptivos en minúsculas con guiones:
- ✅ `llanta-michelin-primacy-4.jpg`
- ❌ `IMG_1234.jpg`
