# Guía de Puesta en Marcha - Grupo Llantero Noguez

¡Felicidades! Aquí tienes tu plataforma web completa. Sigue estos pasos sencillos para ponerla en funcionamiento.

## 1. Requisitos Previos
Asegúrate de tener instalado:
- **XAMPP**: Para la base de datos MySQL.
- **Node.js**: Para ejecutar el código (ya deberías tenerlo).

## 2. Configuración de la Base de Datos (MySQL)
1. Abre el panel de control de **XAMPP** y dale "Start" a **MySQL**.
2. Abre tu navegador y ve a `http://localhost/phpmyadmin`.
3. Haz clic en la pestaña "Importar".
4. Selecciona el archivo `database.sql` que está en la carpeta principal del proyecto (`c:\xampp\htdocs\NOGUEZ\database.sql`).
5. Haz clic en "Continuar" al final de la página.
   - Esto creará la base de datos `llantera_noguez` y todas las tablas necesarias con datos de prueba.

## 3. Encender el Backend (Servidor)
El "Backend" es el cerebro que conecta con la base de datos.
1. Abre una terminal (PowerShell o CMD).
2. Entra a la carpeta del servidor:
   ```bash
   cd c:\xampp\htdocs\NOGUEZ\server
   ```
3. Instala las dependencias (solo la primera vez):
   ```bash
   npm install
   ```
4. Inicia el servidor:
   ```bash
   npm run dev
   ```
   - Deberías ver: `Server running on port 3001` y `Database connected successfully`.
   - **No cierres esta ventana.**

## 4. Encender el Frontend (Página Web)
El "Frontend" es lo que ven tus clientes.
1. Abre **otra** terminal nueva.
2. Entra a la carpeta del cliente:
   ```bash
   cd c:\xampp\htdocs\NOGUEZ\client
   ```
3. Instala las dependencias (solo la primera vez):
   ```bash
   npm install
   ```
4. Inicia la página:
   ```bash
   npm run dev
   ```
5. Verás un enlace como `http://localhost:5173`. Ábrelo en tu navegador. ¡Listo!

## 5. Configuración de Claves (APIs)
Para que los mapas funcionen en producción, necesitas una clave de Google Maps.
1. Ve a [Google Cloud Console](https://console.cloud.google.com/).
2. Crea un proyecto nuevo.
3. Habilita "Maps JavaScript API" y "Maps Embed API".
4. Crea una credencial (API Key).
5. Pega esa clave en el archivo `client/src/pages/Branches.jsx` donde dice `YOUR_API_KEY`.

## 6. Subir a Internet (Hosting)
Cuando quieras que todo el mundo la vea:
1. **Backend**: Necesitas un hosting que soporte Node.js (como Heroku, Railway, o un VPS). Sube la carpeta `server`.
2. **Frontend**:
   - En la terminal del cliente, ejecuta: `npm run build`.
   - Esto creará una carpeta `dist`.
   - Sube el contenido de esa carpeta `dist` a cualquier hosting estático (Hostinger, Netlify, Vercel).

## 7. Solución de Problemas Comunes
- **Error de conexión a base de datos**: Verifica que XAMPP MySQL esté en verde (encendido) y que el usuario sea `root` sin contraseña (configuración por defecto de XAMPP). Si tienes contraseña, edita el archivo `server/.env`.
- **No cargan los productos**: Asegúrate de que el Backend (ventana negra) esté corriendo sin errores.

---
**Desarrollado por tu Equipo Senior de IA**
