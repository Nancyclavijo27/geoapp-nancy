// backend/index.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Datos en memoria (temporal)
let locations = [
  { id: 1, name: "Parque Central", lat: 4.651, lng: -74.061, info: "Parque" },
  { id: 2, name: "Oficina",       lat: 4.659, lng: -74.089, info: "Trabajo" },
  { id: 3, name: "Casa",          lat: 4.648, lng: -74.074, info: "Hogar" }
];

// GET - todas las ubicaciones (devuelve array)
app.get('/api/locations', (req, res) => {
  res.json(locations);
});

// POST - crear
app.post('/api/locations', (req, res) => {
  const { name, lat, lng, info } = req.body;
  if (!name || lat === undefined || lng === undefined) {
    return res.status(400).json({ success: false, message: 'Faltan campos' });
  }
  const newLocation = { id: Date.now(), name, lat: parseFloat(lat), lng: parseFloat(lng), info: info || '' };
  locations.push(newLocation);
  res.status(201).json(newLocation);
});

// PUT - actualizar por id
app.put('/api/locations/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, lat, lng, info } = req.body;
  let found = false;
  locations = locations.map(loc => {
    if (loc.id === id) {
      found = true;
      return { ...loc, name: name ?? loc.name, lat: lat !== undefined ? parseFloat(lat) : loc.lat, lng: lng !== undefined ? parseFloat(lng) : loc.lng, info: info ?? loc.info };
    }
    return loc;
  });
  if (!found) return res.status(404).json({ success: false, message: 'No encontrado' });
  res.json({ success: true, message: 'Actualizado' });
});

// DELETE - eliminar por id
app.delete('/api/locations/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const before = locations.length;
  locations = locations.filter(loc => loc.id !== id);
  if (locations.length === before) return res.status(404).json({ success: false, message: 'No encontrado' });
  res.json({ success: true, message: 'Eliminado' });
});

app.get('/', (req, res) => res.send('Backend Express corriendo'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
