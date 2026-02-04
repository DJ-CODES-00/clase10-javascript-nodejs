const express = require('express');
const https = require('https');

const app = express();
const PORT = 3000;

// Página principal simple
app.get('/', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Gatitos API</title>
        <style>
            body { 
                font-family: Arial; 
                text-align: center; 
                padding: 20px;
                background: #f0f8ff;
            }
            .cat-img { 
                max-width: 500px; 
                border-radius: 10px;
                margin: 20px;
                border: 3px solid #ffb6c1;
            }
            button { 
                padding: 10px 20px; 
                font-size: 16px; 
                margin: 10px;
                background: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
        </style>
    </head>
    <body>
        <h1>🐱 Gatitos con Node.js</h1>
        <button onclick="cargarGatito()">Ver Gatito</button>
        <div id="gatito"></div>

        <script>
            function cargarGatito() {
                fetch('/gatito')
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('gatito').innerHTML = 
                            '<img class="cat-img" src="' + data.url + '">';
                    })
                    .catch(error => {
                        document.getElementById('gatito').innerHTML = 
                            '<p>Error cargando gatito 😿</p>';
                    });
            }

            // Cargar un gatito al iniciar
            cargarGatito();
        </script>
    </body>
    </html>
    `;
    res.send(html);
});

// Ruta API para obtener gatito
app.get('/gatito', (req, res) => {
    https.get('https://api.thecatapi.com/v1/images/search', (apiRes) => {
        let data = '';
        
        apiRes.on('data', chunk => data += chunk);
        
        apiRes.on('end', () => {
            try {
                const gatitos = JSON.parse(data);
                res.json({ url: gatitos[0].url });
            } catch (error) {
                res.status(500).json({ error: 'Error con la API' });
            }
        });
        
    }).on('error', () => {
        res.status(500).json({ error: 'No se pudo conectar' });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log('🚀 Servidor en http://localhost:' + PORT);
    console.log('🐱 Presiona Ctrl+C para detener');
});