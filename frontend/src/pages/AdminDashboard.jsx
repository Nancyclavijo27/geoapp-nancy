// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { processRoute, getMyRoutes } from "../api/routesApi";
import RouteDetail from "../components/RouteDetail";
import useLiveLocation from "../hooks/useLiveLocation";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // 📦 Rutas procesadas (backend)
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ======================================================
     🔴 GPS REAL (SOLO ADMIN / PRUEBAS)
     ====================================================== */
  const [tracking, setTracking] = useState(false);
  const { position, error } = useLiveLocation(tracking);

  useEffect(() => {
    if (position) console.log("📍 GPS real activo:", position);
    if (error) console.error("❌ Error GPS:", error);
  }, [position, error]);

  /* ======================================================
     📥 Cargar rutas reales (procesadas)
     ====================================================== */
  const loadRoutes = async () => {
    try {
      const res = await getMyRoutes();
      setRoutes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ======================================================
     ⚙️ Procesar ruta (backend)
     ====================================================== */
  const handleProcessRoute = async () => {
    try {
      setLoading(true);
      await processRoute();
      await loadRoutes();
      alert("Ruta procesada correctamente");
    } catch (err) {
      console.error(err);
      alert("Error procesando la ruta");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  return (
    <main style={{ padding: "30px" }}>
      <h1>Panel Admin (pruebas técnicas)</h1>
      <p>Backend, GPS real y rutas procesadas</p>

      {/* GPS REAL */}
      <section>
        <button onClick={() => setTracking(true)}>Iniciar GPS</button>
        <button onClick={() => setTracking(false)}>Detener GPS</button>
      </section>

      <hr />

      {/* Procesar ruta */}
      <button onClick={handleProcessRoute} disabled={loading}>
        {loading ? "Procesando..." : "Procesar ruta"}
      </button>

      <hr />

      {/* Lista de rutas reales */}
      {routes.length === 0 ? (
        <p>No hay rutas procesadas</p>
      ) : (
        <ul>
          {routes.map((r) => (
            <li
              key={r.id}
              style={{ cursor: "pointer", marginBottom: "8px" }}
              onClick={() => setSelectedRoute(r)}
            >
              📍 {r.distanceKm.toFixed(2)} km — ⏱{" "}
              {r.durationMin.toFixed(1)} min
            </li>
          ))}
        </ul>
      )}

      <hr />

      {/* Detalle técnico */}
      <RouteDetail route={selectedRoute} />

      <button onClick={() => navigate("/home")} style={{ marginTop: "20px" }}>
        Volver
      </button>
    </main>
  );
}
