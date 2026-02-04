const express = require("express");
const app = express();
const port = 3000;

// Middleware para loguear accesos
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString('es-ES');
  console.log(`📍 [${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Página de inicio con diseño atractivo
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Práctica Node.js</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
          margin: 0;
          padding: 0;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .card {
          background: rgba(255, 255, 255, 0.9);
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          width: 80%;
          max-width: 500px;
        }
        h1 {
          color: #2c3e50;
          margin-bottom: 1.5rem;
        }
        .btn {
          display: inline-block;
          margin: 0.5rem;
          padding: 0.8rem 1.5rem;
          background: #3498db;
          color: white;
          text-decoration: none;
          border-radius: 50px;
          transition: all 0.3s;
          font-weight: bold;
        }
        .btn:hover {
          background: #2980b9;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        .features {
          text-align: left;
          margin: 2rem 0;
        }
        .feature-item {
          margin: 0.5rem 0;
          display: flex;
          align-items: center;
        }
        .emoji {
          font-size: 1.5rem;
          margin-right: 0.5rem;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🚀 Práctica Node.js con Express</h1>
        
        <div class="features">
          <div class="feature-item">
            <span class="emoji">💻</span>
            <span>Servidor web rápido y sencillo</span>
          </div>
          <div class="feature-item">
            <span class="emoji">🎨</span>
            <span>Diseño moderno y atractivo</span>
          </div>
          <div class="feature-item">
            <span class="emoji">⚡</span>
            <span>Sin dependencias adicionales</span>
          </div>
        </div>
        
        <a href="/api" class="btn">Ver API Demo</a>
        <a href="/info" class="btn">Más Información</a>
      </div>
    </body>
    </html>
  `);
});

// Ruta API simple
app.get("/api", (req, res) => {
  console.log(`✨ Usuario accedió a la API`);
  res.json({
    proyecto: "Práctica Node.js",
    autor: "Tú",
    fecha: new Date(),
    endpoints: ["/api", "/info", "/saludo/:nombre"],
  });
});

// Ruta con parámetro dinámico
app.get("/saludo/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  console.log(`👋 Saludo generado para: ${nombre}`);
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Saludo</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .message {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        h1 {
          color: #e74c3c;
        }
      </style>
    </head>
    <body>
      <div class="message">
        <h1>👋 ¡Hola, ${nombre}!</h1>
        <p>Este es un saludo personalizado desde Node.js</p>
        <a href="/">Volver al inicio</a>
      </div>
    </body>
    </html>
  `);
});

// Ruta informativa
app.get("/info", (req, res) => {
  console.log(`ℹ️ Usuario consultó la información del proyecto`);
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Información</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
          margin: 0;
          padding: 2rem;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.9);
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        .back-btn {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background: #3498db;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Información sobre este proyecto</h1>
        <p>Este es un servidor de ejemplo creado con Node.js y Express para propósitos de aprendizaje.</p>
        
        <h2>Características principales:</h2>
        <ul>
          <li>No requiere instalación de dependencias adicionales</li>
          <li>Diseño visual atractivo con CSS moderno</li>
          <li>Ejemplos de rutas básicas y dinámicas</li>
          <li>Respuestas en HTML y JSON</li>
        </ul>
        
        <h2>¿Qué puedes hacer?</h2>
        <ol>
          <li>Modificar los estilos CSS</li>
          <li>Añadir nuevas rutas</li>
          <li>Experimentar con diferentes respuestas</li>
          <li>Integrar una base de datos sencilla</li>
        </ol>
        
        <a href="/" class="back-btn">← Volver al inicio</a>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  const hora = new Date().toLocaleTimeString('es-ES');
  console.log(`
🚀 SERVIDOR INICIADO CORRECTAMENTE
🌐 URL: http://localhost:${port}
⏱️  Hora: ${hora}
✅ Estado: EN LÍNEA
  `);
});
