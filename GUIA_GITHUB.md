# Guía para Subir tu Proyecto a GitHub

Sigue estos pasos para guardar tu código en la nube (GitHub).

## 1. Preparación (Git Bash)

Abre tu terminal (Git Bash o la terminal de VS Code) en la carpeta principal de tu proyecto:
`c:\xampp\htdocs\NOGUEZ`

Ejecuta estos comandos uno por uno:

```bash
# 1. Inicializar el repositorio (solo la primera vez)
git init

# 2. Agregar todos los archivos (el punto es importante)
git add .

# 3. Guardar los cambios con un mensaje
git commit -m "Primer despliegue en VPS completado"
```

## 2. Crear el Repositorio en GitHub

1.  Ve a [github.com/new](https://github.com/new).
2.  Nombre del repositorio: `grupo-noguez-web` (o el que gustes).
3.  Público o Privado: **Privado** (recomendado si tienes datos sensibles).
4.  No marques ninguna casilla de "Initialize this repository".
5.  Dale a **Create repository**.

## 3. Conectar y Subir

Verás una pantalla con instrucciones. Copia el bloque que dice **"…or push an existing repository from the command line"**.

Se verá parecido a esto (**¡Pero usa el que te da GitHub, no este!**):

```bash
git remote add origin https://github.com/TU_USUARIO/grupo-noguez-web.git
git branch -M main
git push -u origin main
```

Pega esos comandos en tu terminal y dale Enter.

---

## ¿Cómo guardar cambios en el futuro?

Cada vez que hagas modificaciones y quieras guardarlas:

1.  `git add .`
2.  `git commit -m "Descripción de lo que cambiaste"`
3.  `git push`

¡Listo! Tu código estará seguro en internet.
