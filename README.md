# Calculadora de juego

Este repositorio contiene la página web estática del proyecto "Calculadora de juego".

Contenido:
- `index.html`, `resultados.html`, `mis-listas.html`, `cuenta.html`, `contacto.html`, `terminos.html`, `privacidad.html`
- Carpeta `css/` con estilos
- Carpeta `JS/` con scripts
- Carpeta `Images/` con imágenes

Cómo usar localmente:
1. Abrir `index.html` en el navegador (doble clic) o servir con un servidor estático.

Crear repo remoto en GitHub (opciones):

Opción A — Manual (recomendado si no tienes `gh` instalado):
1. Ve a https://github.com y crea un nuevo repositorio (por ejemplo `calculadora-de-juego`).
2. Luego en tu máquina ejecuta:

```
cd "e:/3er semestre/Calculadora de juego"
git remote add origin https://github.com/TU_USUARIO/NOMBRE_REPO.git
git branch -M main
git push -u origin main
```

Opción B — Usando GitHub CLI (`gh`) si está instalado y autenticado:

```
cd "e:/3er semestre/Calculadora de juego"
gh repo create TU_USUARIO/calculadora-de-juego --public --source . --remote origin --push
```

Notas:
- Reemplaza `TU_USUARIO` y `NOMBRE_REPO` por tus valores.
- Si Git pide `user.name`/`user.email`, configúralos con `git config`.

Si quieres, puedo intentar crear el repo remoto por ti usando `gh` (necesita que estés autenticado), o bien esperar a que me des la URL remota para añadirla y empujar.