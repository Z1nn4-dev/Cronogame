document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // AUTO-DETECCIÓN DE GIFS (CONVENCIÓN DE NOMBRES)
    // ==========================================
    // Javascript no puede "escanear" tu disco duro por seguridad.
    // Para que sea 100% automático, he diseñado un sistema de búsqueda en cadena.
    // Solo debes nombrar tus GIFs con números: 1.gif, 2.gif, 3.gif, 4.gif...
    // El código probará cargar el número 1, luego el 2, etc. Cuando no encuentre el siguiente,
    // sabrá exactamente cuántos hay disponibles y generará el fondo. ¡Magia automática!

    const folderPath = 'Images/portrate/gif/';
    const gifsDisponibles = [];
    let currentIndex = 1;

    function findGifs() {
        const img = new Image();
        const testPath = `${folderPath}${currentIndex}.gif`;

        img.onload = function () {
            // El GIF existe, lo agregamos a la lista
            gifsDisponibles.push(`${currentIndex}.gif`);
            currentIndex++;
            findGifs(); // Recursividad: intentar buscar el siguiente número
        };

        img.onerror = function () {
            // La imagen dio error (no existe). Llegamos al límite de GIFs.
            if (gifsDisponibles.length > 0) {
                console.log(`¡Se encontraron ${gifsDisponibles.length} GIFs automáticamente! Generando fondo...`);
                buildMosaic();
            } else {
                console.warn("No se encontraron archivos nombrados 1.gif, 2.gif, etc. en la carpeta " + folderPath);
            }
        };

        img.src = testPath; // Inicia la carga
    }

    // Disparamos la búsqueda al cargar la página
    findGifs();

    function buildMosaic() {
        const mover = document.getElementById('bg-gif-mover');
        if (!mover) return;

        // Normalización de la resolución: formato vertical 10:16
        const tileWidth = 200;
        const tileHeight = 320;
        const cols = 16;
        const rows = 10;
        const blockWidth = tileWidth * cols; // 3200px
        const blockHeight = tileHeight * rows; // 3200px

        // Para lograr un movimiento continuo a la izquierda (-X) y deslizamientos iguales,
        // necesitamos duplicar las columnas horizontalmente (3 bloques)
        for (let blockX = 0; blockX < 3; blockX++) {
            for (let col = 0; col < cols; col++) {
                const colDiv = document.createElement('div');
                colDiv.className = 'gif-column';
                colDiv.style.width = tileWidth + 'px';
                colDiv.style.position = 'absolute';
                colDiv.style.left = (blockX * blockWidth + col * tileWidth) + 'px';

                // Alternamos animaciones: moveUp en 32s y moveDown 25% más lento (80s en lugar de 60s)
                const isEven = (col % 2 === 0);
                colDiv.style.animation = isEven ? 'moveUp 32s linear infinite' : 'moveDown 80s linear infinite';
                
                // Las columnas que bajan deben empezar más arriba para no mostrar huecos
                if (!isEven) {
                    colDiv.style.top = `-${blockHeight}px`;
                } else {
                    colDiv.style.top = '0px';
                }

                // Generamos secuencia asegurando que NO haya duplicados adyacentes (ni arriba ni a la izquierda)
                const colTiles = [];
                for (let r = 0; r < rows; r++) {
                    let availableGifs = [...gifsDisponibles];
                    
                    // Evitar duplicado vertical (arriba)
                    if (r > 0) {
                        availableGifs = availableGifs.filter(g => g !== colTiles[r-1]);
                    }
                    
                    // Si tenemos muy pocos GIFs de base, evitamos que la validación colapse
                    if (availableGifs.length === 0) availableGifs = gifsDisponibles;

                    colTiles.push(availableGifs[Math.floor(Math.random() * availableGifs.length)]);
                }

                // Triplicamos para el loop vertical
                for (let copy = 0; copy < 3; copy++) {
                    colTiles.forEach((gif) => {
                        const tile = document.createElement('div');
                        tile.className = 'gif-tile';
                        tile.style.backgroundImage = `url('${folderPath}${gif}')`;
                        tile.style.width = tileWidth + 'px';
                        tile.style.height = tileHeight + 'px';
                        tile.style.flexShrink = '0';
                        
                        // MAGIA POR CÓDIGO: Multiplicamos la variedad visual artificialmente
                        // (Efecto espejo removido para preservar la legibilidad del texto en los GIFs)
                        
                        // Ligeros cambios de tonalidad de color y brillo al azar
                        const hue = Math.floor(Math.random() * 40) - 20; // Rota colores levemente (-20 a +20 deg)
                        const brightness = 0.8 + (Math.random() * 0.4); // Brillo entre 0.8 y 1.2
                        
                        tile.style.filter = `hue-rotate(${hue}deg) brightness(${brightness})`;

                        colDiv.appendChild(tile);
                    });
                }

                mover.appendChild(colDiv);
            }
        }

        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes moveLeftBase {
                0% { transform: translateX(0); }
                100% { transform: translateX(-${blockWidth}px); }
            }
            #bg-gif-mover {
                animation: moveLeftBase 60s linear infinite;
            }
            @keyframes moveUp {
                0% { transform: translateY(0); }
                100% { transform: translateY(-${blockHeight}px); }
            }
            @keyframes moveDown {
                0% { transform: translateY(0); }
                100% { transform: translateY(${blockHeight}px); }
            }
        `;
        document.head.appendChild(style);
    }
});
