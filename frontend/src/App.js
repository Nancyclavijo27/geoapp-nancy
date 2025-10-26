import React, { useEffect, useState } from "react";

function App() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/locations")
      .then((res) => res.json())
      .then((data) => {
        // 👇 Aquí está el cambio importante
        if (data.success && Array.isArray(data.data)) {
          setLocations(data.data);
        } else {
          throw new Error("Formato de datos inválido");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Locations (Prueba)</h1>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <ul>
          {locations.map((loc) => (
            <li key={loc.id}>
              <strong>{loc.name}</strong> — lat: {loc.lat}, lng: {loc.lng}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
