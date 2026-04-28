# Manual Maestro de Despliegue: VPS Hostinger (OpenLiteSpeed + Node.js)

Este documento registra paso a paso todo el proceso que realizamos para desplegar la aplicación `gruponoguez.com` en un VPS de Hostinger.

## Prerrequisitos
*   Tener un VPS en Hostinger con la plantilla **OpenLiteSpeed Node.js**.
*   Tener instalado **FileZilla** en tu computadora.
*   Tener acceso al panel de Hostinger.

---

## Parte 1: Preparación del Código (Local)

1.  Abrir la terminal en la carpeta del cliente:
    ```bash
    cd c:\xampp\htdocs\NOGUEZ\client
    ```
2.  Generar la versión de producción:
    ```bash
    npm run build
    ```
    *(Esto actualiza la carpeta `dist` con los últimos cambios).*

---

## Parte 2: Conexión y Subida de Archivos

Usamos **FileZilla** para subir los archivos.

*   **Host**: La IP del VPS (ej. `76.13.106.66`).
*   **Usuario**: `root`.
*   **Contraseña**: La contraseña root del VPS.
*   **Puerto**: `22`.

### Ruta de Destino
La carpeta pública en esta plantilla de VPS es:
👉 **`/usr/local/lsws/Example/html`**

### Pasos de Subida:
1.  Borrar los archivos de ejemplo que vienen por defecto en esa carpeta.
2.  **Frontend**: Subir todo el **contenido** de `client/dist` (assets, index.html, etc.) a la raíz `html`.
3.  **Backend**:
    *   Crear una carpeta llamada `api` dentro de `html`.
    *   Subir el contenido de `server` dentro de `api` (EXCEPTO `node_modules`).

---

## Parte 3: Configuración del Servidor (Terminal)

Usamos la terminal (PuTTY o la del navegador en Hostinger) para "encender" el backend.

1.  Instalar PM2 (Gestor de procesos):
    ```bash
    npm install -g pm2
    ```
2.  Navegar a la carpeta de la API:
    ```bash
    cd /usr/local/lsws/Example/html/api
    ```
3.  Instalar dependencias del proyecto:
    ```bash
    npm install
    ```
4.  Iniciar el servidor:
    ```bash
    pm2 start index.js --name "api-noguez"
    ```
5.  Guardar para que inicie automático:
    ```bash
    pm2 save
    pm2 startup
    ```

---

## Parte 4: Configuración de OpenLiteSpeed (WebAdmin)

Para que el servidor web entienda las peticiones `/api`.

1.  **Abrir el puerto del panel (Solo necesario una vez):**
    En la terminal ejecutar:
    ```bash
    ufw allow 7080
    ```
2.  Entrar a `https://TU_IP:7080` (usuario `admin`).
3.  **Crear External App** (Para conectar con Node.js):
    *   Ir a **Virtual Hosts** -> **Example** -> **External App** -> **Add**.
    *   Tipo: **Web Server**.
    *   Name: `node-backend`.
    *   Address: `http://127.0.0.1:3001`.
    *   Initial Request Timeout: `60`.
    *   Retry Timeout: `0`.
    *   Guardar.
4.  **Crear Contexto (Proxy)**:
    *   Ir a **Context** -> **Add** -> **Proxy**.
    *   URI: `/api/`.
    *   Web Server: `[::1]:3001` (o seleccionar `node-backend`).
    *   Guardar.
5.  **Reiniciar**: Clic al botón verde "Graceful Restart".

---

## Parte 5: Conectar el Dominio (DNS)

Para que `gruponoguez.com` entre al VPS.

1.  En Hostinger, ir a **DNS / Nameservers**.
2.  Editar el registro **Tipo A** con nombre **@**.
3.  Cambiar la IP antigua por la IP del VPS (`76.13.106.66`).
4.  Guardar y esperar la propagación.

---

## Parte 6: Solución Error 404 (Rutas de React)

Si al entrar a `/contacto` o `/productos` te sale error 404, es porque el servidor busca una carpeta y no la encuentra. Debemos forzar que todo vaya al `index.html`.

1.  Entrar al panel **OpenLiteSpeed** (`https://TU_IP:7080`).
2.  Ir a **Virtual Hosts** -> **Example** (o tu dominio).
3.  Pestaña **Rewrite**.
4.  Asegurarse de:
    *   Enable Rewrite: **Yes**
    *   Auto Load from .htaccess: **Yes**
5.  **IMPORTANTE**: En la sección **Rewrite Rules**, darle a **Editar** y pegar esto:
    ```apache
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
    ```
6.  Guardar y **Reiniciar** (Graceful Restart).

---

## Parte 7: Mantenimiento y Actualizaciones (Muy Importante)

Si haces cambios en el código y los subes al VPS, o si borraste por error la carpeta `node_modules`, sigue estos pasos para que el sitio vuelva a funcionar:

### 1. Si el servidor no arranca (Error "Cannot find module")
Si al intentar iniciar el servidor te sale un error de que falta una librería (como `express` o `axios`), entra a la terminal del VPS y ejecuta:
```bash
# 1. Entrar a la carpeta de la API
cd /usr/local/lsws/Example/html/api

# 2. Reinstalar todas las librerías
npm install

# 3. Reiniciar el proceso
pm2 restart api-noguez
```

### 2. Si subiste cambios en el código del Backend (`server`)
Cada vez que subas un archivo nuevo a la carpeta `api` (como un controlador o una ruta):
```bash
pm2 restart api-noguez
```

### 3. Si subiste cambios en el código del Frontend (`client`)
1. Genera el build en tu computadora (`npm run build`).
2. Sube el contenido de `dist` a la carpeta `html` del VPS.
3. **No es necesario reiniciar nada**, los cambios se verán reflejados al refrescar la página (`Ctrl + F5`).

### 4. Ver qué está pasando (Logs)
Si algo falla y no sabes qué es, usa este comando para ver los errores en tiempo real:
```bash
pm2 logs api-noguez --lines 50
```

---

¡Listo! Con estos pasos tu sitio queda 100% funcional y bajo control.

