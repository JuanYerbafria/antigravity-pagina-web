# Guía de Despliegue en Hostinger

Esta guía te ayudará a subir tu aplicación (Frontend React + Backend Node.js) a Hostinger.

> [!IMPORTANT]
> Esta guía asume que tienes un plan de Hostinger que soporta **Node.js** (como los planes Business, Cloud o VPS).

## Parte 1: Preparación de Archivos

### 1. Construir el Frontend (Cliente)
El "cliente" es la parte visual de tu página. Necesitamos convertir el código en archivos listos para internet.

1.  Abre una terminal en tu computadora.
2.  Navega a la carpeta del cliente: `cd c:\xampp\htdocs\NOGUEZ\client`
3.  Ejecuta el comando de construcción:
    ```bash
    npm run build
    ```
4.  Esto creará una carpeta llamada **`dist`** dentro de la carpeta `client`.

### 2. Preparar el Backend (Servidor)
El "servidor" es el cerebro que conecta tu página con Google Sheets y el correo.

1.  Asegúrate de que tu archivo `server/package.json` tenga el script "start". (Ya lo tiene: `"start": "node index.js"`).
2.  No subas la carpeta `node_modules`. Se instalará en Hostinger.

## Parte 2: Configuración en Hostinger (hPanel)

### 1. Subir Archivos (Administrador de Archivos)
1.  Ve a **Archivos** -> **Administrador de Archivos**.
2.  Entra a la carpeta `public_html`.
3.  **Para el Backend:**
    *   Crea una carpeta llamada `api` o `server`.
    *   Sube todos los archivos de tu carpeta `server` (EXCEPTO `node_modules`).
4.  **Para el Frontend:**
    *   Sube todo el **contenido** de la carpeta `client/dist` (que creaste en el paso 1) directamente en `public_html` (o en una subcarpeta si no es el dominio principal).

### 2. Configurar Node.js (Solo para el Backend)
Esta opción está **dentro del panel de tu sitio web**, no en el menú principal.

1.  En el menú de la izquierda que muestras en la imagen, haz clic en **Sitios web**.
2.  Verás tu dominio. Haz clic en el botón **Administrar** (o "Manage").
3.  Ahora estarás en el **Tablero** (Dashboard) de tu sitio.
4.  En la barra de búsqueda (arriba a la izquierda) escribe **"Node.js"** o busca en la sección **Avanzado**.

Si tu plan lo permite, verás la opción **Aplicaciones Node.js**.

1.  **Versión de Node:** Selecciona la versión 18 o 20 (recomendable 20).
2.  **Modo de aplicación:** Production.
3.  **Raíz de la aplicación:** Escribe la ruta donde subiste el servidor (ej: `public_html/api`).
4.  **Archivo de inicio:** `index.js`.
5.  **Instalar dependencias:** Haz clic en el botón "NPM Install" (esto instalará lo que faltaba de `node_modules`).
6.  **Variables de Entorno:** Agrega las siguientes variables:
    *   `EMAIL_USER`: Tu correo de Gmail (para enviar los formularios de contacto).
    *   `EMAIL_PASS`: Tu contraseña de aplicación de Gmail (no tu contraseña normal).
    *   `PORT`: 3001 (o el que te asigne Hostinger).

### 3. Configurar el Frontend para conectar con el Backend
Dado que ya hicimos cambios en el código, solo necesitas asegurarte de que cuando el cliente intente conectarse, sepa dónde está la API.

En Hostinger, normalmente el servidor Node.js correrá en un puerto interno. Es posible que necesites configurar un archivo `.htaccess` en la carpeta `api` para redirigir el tráfico.

**Ejemplo básico de .htaccess para el Frontend (React Router):**
Crea un archivo `.htaccess` en la raíz (`public_html`) con esto para que las rutas de React funcionen:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

## Solución de Problemas Comunes

*   **Error 404 en rutas:** Asegúrate de que el `.htaccess` esté en la carpeta del frontend.
*   **Error al enviar correo:** Verifica doblemente tu `EMAIL_USER` y `EMAIL_PASS`. Recuerda que para Gmail necesitas una "Contraseña de Aplicación" si tienes la verificación en dos pasos activada.
*   **El sitio no carga:** Revisa la consola del navegador (F12) para ver si hay errores en rojo.
