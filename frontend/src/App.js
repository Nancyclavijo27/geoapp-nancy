import React, { useEffect, useState } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Ajuste del icono (evita ícono roto)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function App() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/locations');
      if (res.data && res.data.data) {
        setLocations(res.data.data); // 🔹 accedemos a data.data, no a data
      } else {
        console.error('Respuesta inesperada del backend', res.data);
      }
    } catch (error) {
      console.error('Error al obtener ubicaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
    const timer = setInterval(fetchLocations, 15000);
    return () => clearInterval(timer);
  }, []);

  const center = locations.length
    ? [locations[0].lat, locations[0].lng]
    : [4.651, -74.061];

  return (
    <div className="App">
      <h1>🗺️ GeoApp Nancy — Mapa de ubicaciones</h1>

      {loading ? (
        <p>Cargando ubicaciones...</p>
      ) : (
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '60vh', width: '90%', margin: '0 auto' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {locations.map((loc) => (
            <Marker key={loc.id} position={[loc.lat, loc.lng]}>
              <Popup>
                <strong>{loc.name}</strong><br />
                Lat: {loc.lat}, Lng: {loc.lng}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      <div style={{ width: '90%', margin: '20px auto' }}>
        <button onClick={fetchLocations}>Refrescar ahora</button>
        <ul>
          {locations.map((l) => (
            <li key={l.id}>
              {l.name} — lat: {l.lat}, lng: {l.lng}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
