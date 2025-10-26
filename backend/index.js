// backend/index.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors()); // permite peticiones desde tu React (puedes restringir orígenes más tarde)
app.use(express.json());

// Datos de ejemplo: ubicaciones con coordenadas
const locations = [
  { id: 1, name: "Parque Central", lat: 4.651, lng: -74.061 },
  { id: 2, name: "Oficina",       lat: 4.659, lng: -74.089 },
  { id: 3, name: "Casa",          lat: 4.648, lng: -74.074 }
];

// Ruta de prueba
app.get('/api/locations', (req, res) => {
  res.json({ success: true, data: locations });
});

// Ruta simple para verificar que el server funciona
app.get('/', (req, res) => res.send('Backend Express corriendo'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
