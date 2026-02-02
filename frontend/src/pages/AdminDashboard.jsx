import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { processRoute, getMyRoutes } from "../api/routesApi";
import RouteDetail from "../components/RouteDetail";
import useLiveLocation from "../hooks/useLiveLocation";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [loading, setLoading] = useState(false);

  const [tracking, setTracking] = useState(false);
  const { position, error } = useLiveLocation(tracking);

  const loadRoutes = async () => {
    const res = await getMyRoutes();
    setRoutes(res.data);
  };

  const handleProcessRoute = async () => {
    setLoading(true);
    await processRoute();
    await loadRoutes();
    setLoading(false);
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  return (
    <main className={styles.page}>
      <h1>Panel Admin</h1>

      <Card>
        <h3>GPS real</h3>
        <div className={styles.actions}>
          <Button onClick={() => setTracking(true)}>Iniciar GPS</Button>
          <Button onClick={() => setTracking(false)}>Detener GPS</Button>
        </div>
      </Card>

      <Card>
        <Button onClick={handleProcessRoute}>
          {loading ? "Procesando..." : "Procesar ruta"}
        </Button>
      </Card>

      <Card>
        <h3>Rutas procesadas</h3>
        <ul className={styles.list}>
          {routes.map((r) => (
            <li key={r.id} onClick={() => setSelectedRoute(r)}>
              📍 {r.distanceKm.toFixed(2)} km — ⏱ {r.durationMin.toFixed(1)} min
            </li>
          ))}
        </ul>
      </Card>

      {selectedRoute && <RouteDetail route={selectedRoute} />}

      <Button onClick={() => navigate("/home")}>Volver</Button>
    </main>
  );
}
