import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyRoutes } from "../api/routesApi";

export default function MyRoutesPage() {
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyRoutes()
      .then(res => setRoutes(res.data))
      .catch(console.error);
  }, []);

  return (
    <main>
      <h1>Mis rutas</h1>

      {routes.length === 0 ? (
        <p>No tienes rutas procesadas aún</p>
      ) : (
        <ul>
          {routes.map(route => (
            <li key={route.id}>
              📍 {route.distanceKm.toFixed(2)} km —{" "}
              ⏱ {route.durationMin.toFixed(1)} min

              <button
                onClick={() => navigate(`/routes/${route.id}`)}
              >
                Ver detalle
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
