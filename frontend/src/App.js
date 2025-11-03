// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Ajuste iconos
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function App() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state (se usa para crear y editar)
  const [form, setForm] = useState({ id: null, name: '', lat: '', lng: '', info: '' });
  const [isEditing, setIsEditing] = useState(false);

  const API = 'http://localhost:3001/api/locations';

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setLocations(res.data || []);
    } catch (err) {
      console.error('Error fetching locations', err);
      alert('Error al obtener ubicaciones. Revisa la consola.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Create
  const handleCreate = async (e) => {
    e.preventDefault();
    const { name, lat, lng, info } = form;
    if (!name || lat === '' || lng === '') { alert('Completa nombre, lat y lng'); return; }
    try {
      await axios.post(API, { name, lat, lng, info });
      setForm({ id: null, name: '', lat: '', lng: '', info: '' });
      fetchLocations();
    } catch (err) {
      console.error(err);
      alert('Error al crear ubicación');
    }
  };

  // Start editing
  const startEdit = (loc) => {
    setIsEditing(true);
    setForm({ id: loc.id, name: loc.name, lat: loc.lat, lng: loc.lng, info: loc.info || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { id, name, lat, lng, info } = form;
    if (!id) return;
    try {
      await axios.put(`${API}/${id}`, { name, lat, lng, info });
      setIsEditing(false);
      setForm({ id: null, name: '', lat: '', lng: '', info: '' });
      fetchLocations();
    } catch (err) {
      console.error(err);
      alert('Error al actualizar ubicación');
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta ubicación?')) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchLocations();
    } catch (err) {
      console.error(err);
      alert('Error al eliminar');
    }
  };

  const center = locations.length ? [locations[0].lat, locations[0].lng] : [4.651, -74.061];

  return (
    <div className="App" style={{ paddingBottom: 50 }}>
      <h1>GeoApp Nancy — CRUD de ubicaciones</h1>

      {/* FORMULARIO */}
      <div style={{ width: '90%', margin: '0 auto 20px', padding: 10, border: '1px solid #ddd', borderRadius: 8 }}>
        <h3>{isEditing ? 'Editar ubicación' : 'Agregar nueva ubicación'}</h3>
        <form onSubmit={isEditing ? handleUpdate : handleCreate} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input name="name" placeholder="Nombre" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
          <input name="lat" type="number" step="0.000001" placeholder="Latitud" value={form.lat} onChange={(e) => setForm({...form, lat: e.target.value})} required />
          <input name="lng" type="number" step="0.000001" placeholder="Longitud" value={form.lng} onChange={(e) => setForm({...form, lng: e.target.value})} required />
          <input name="info" placeholder="Info (opcional)" value={form.info} onChange={(e) => setForm({...form, info: e.target.value})} />
          <button type="submit">{isEditing ? 'Guardar cambios' : 'Agregar ubicación'}</button>
          {isEditing && <button type="button" onClick={() => { setIsEditing(false); setForm({ id: null, name: '', lat: '', lng: '', info: '' }); }}>Cancelar</button>}
        </form>
      </div>

      {/* MAPA */}
      {loading ? <p>Cargando ubicaciones...</p> : (
        <MapContainer center={center} zoom={13} style={{ height: '60vh', width: '90%', margin: '0 auto' }}>
          <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {locations.map(loc => (
            <Marker key={loc.id} position={[loc.lat, loc.lng]}>
              <Popup>
                <strong>{loc.name}</strong><br/>
                {loc.info && <div>{loc.info}<br/></div>}
                <small>Lat: {loc.lat} — Lng: {loc.lng}</small>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      {/* LISTA Y ACCIONES */}
      <div style={{ width: '90%', margin: '20px auto' }}>
        <button onClick={fetchLocations}>Refrescar ahora</button>
        <ul>
          {locations.map(l => (
            <li key={l.id} style={{ margin: '8px 0' }}>
              <strong>{l.name}</strong> — lat: {l.lat}, lng: {l.lng} {' '}
              <button onClick={() => startEdit(l)}>Editar</button>{' '}
              <button onClick={() => handleDelete(l.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
