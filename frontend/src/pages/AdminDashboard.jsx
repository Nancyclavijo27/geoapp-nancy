import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { processRoute, getMyRoutes } from "../api/routesApi";
import RouteDetail from "../components/RouteDetail";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const loadRoutes = async () => {
    const res = await getMyRoutes();
    setRoutes(res.data);
  };

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
    <div style={{ padding: "30px" }}>
      <h1>Panel Admin (temporal)</h1>
      <p>Vista técnica para probar historial de rutas</p>

      <button onClick={handleProcessRoute} disabled={loading}>
        {loading ? "Procesando..." : "Procesar ruta"}
      </button>

      <hr />

      {routes.length === 0 ? (
        <p>No hay rutas registradas</p>
      ) : (
        <ul>
          {routes.map((r) => (
            <li
              key={r.id}
              onClick={() => setSelectedRoute(r)}
              style={{ cursor: "pointer", marginBottom: "8px" }}
            >
              📍 {r.distanceKm.toFixed(2)} km — ⏱{" "}
              {r.durationMin.toFixed(1)} min
            </li>
          ))}
        </ul>
      )}

      <hr />

      <RouteDetail route={selectedRoute} />

      <button
        onClick={() => navigate("/home")}
        style={{ marginTop: "20px" }}
      >
        Salir
      </button>
    </div>
  );
}
