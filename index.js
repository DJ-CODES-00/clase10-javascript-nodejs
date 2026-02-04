const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = path.resolve(__dirname);

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

app.get('/', (req, res) => {
  fs.readdir(ROOT, (err, files) => {
    if (err) return res.status(500).send('Error leyendo directorio');

    files = files.filter(f => !f.startsWith('.') && f !== 'node_modules' && f !== 'package-lock.json');

    const rows = files.map(f => {
      const full = path.join(ROOT, f);
      let stat;
      try { stat = fs.statSync(full); } catch { stat = null; }
      const type = stat && stat.isDirectory() ? 'Carpeta' : 'Archivo';
      return `
        <tr>
          <td><a href="/ver/${encodeURIComponent(f)}">${escapeHtml(f)}</a></td>
          <td>${type}</td>
          <td>${stat ? stat.size : '-'} bytes</td>
          <td><a href="/raw/${encodeURIComponent(f)}">Ver crudo</a></td>
        </tr>`;
    }).join('\n');

    res.send(`
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Index de archivos - clase10</title>
        <style>
          body { font-family: Arial, Helvetica, sans-serif; padding: 24px; background: #f7fbff; }
          table { width: 100%; border-collapse: collapse; }
          th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
          a { color: #0366d6; text-decoration: none; }
          a:hover { text-decoration: underline; }
          pre { background: #0d1117; color: #c9d1d9; padding: 12px; overflow: auto; }
          .header { display:flex; justify-content:space-between; align-items:center; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📁 Index de archivos - carpeta <code>${escapeHtml(path.basename(ROOT))}</code></h1>
          <div><strong>Puerto:</strong> ${PORT} — <a href="/">Actualizar</a></div>
        </div>
        <table>
          <thead>
            <tr><th>Nombre</th><th>Tipo</th><th>Tamaño</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
        <hr>
        <p>Haz click en un archivo para verlo con formato o en "Ver crudo" para obtener el contenido plano.</p>
      </body>
      </html>
    `);
  });
});

// Vista bonita del archivo (HTML con <pre>)
app.get('/ver/:name', (req, res) => {
  const name = path.basename(req.params.name);
  const full = path.join(ROOT, name);
  if (!full.startsWith(ROOT)) return res.status(400).send('Solicitud inválida');

  fs.stat(full, (err, stat) => {
    if (err) return res.status(404).send('No encontrado');
    if (stat.isDirectory()) return res.redirect('/');

    fs.readFile(full, 'utf8', (err, content) => {
      if (err) return res.status(500).send('Error leyendo archivo');
      const escaped = escapeHtml(content);
      res.send(`
        <!doctype html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Ver: ${escapeHtml(name)}</title>
          <style>
            body { font-family: monospace; padding: 20px; background: #0b0f14; color: #c9d1d9; }
            a { color: #58a6ff; }
            pre { white-space: pre-wrap; word-wrap: break-word; }
            .meta { margin-bottom: 12px; }
          </style>
        </head>
        <body>
          <div class="meta">
            <a href="/">⬅️ Volver al index</a> · <strong>${escapeHtml(name)}</strong>
          </div>
          <pre>${escaped}</pre>
        </body>
        </html>
      `);
    });
  });
});

// Raw text
app.get('/raw/:name', (req, res) => {
  const name = path.basename(req.params.name);
  const full = path.join(ROOT, name);
  if (!full.startsWith(ROOT)) return res.status(400).send('Solicitud inválida');

  fs.stat(full, (err, stat) => {
    if (err) return res.status(404).send('No encontrado');
    if (stat.isDirectory()) return res.status(400).send('No es un archivo');

    res.type('txt');
    fs.createReadStream(full).pipe(res);
  });
});

app.listen(PORT, () => {
  console.log(`📂 Index listo en http://localhost:${PORT}`);
});
