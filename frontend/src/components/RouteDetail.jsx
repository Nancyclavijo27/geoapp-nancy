import { useEffect, useState } from "react";
import { getRouteById } from "../api/routesApi";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function RouteDetail({ routeId }) {
  const [route, setRoute] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getRouteById(routeId)
      .then(res => setRoute(res.data))
      .catch(err => {
        console.error(err);
        setError(true);
      });
  }, [routeId]);

  if (error) {
    return <p>No se pudo cargar la ruta</p>;
  }

  if (!route) {
    return <p>Cargando ruta...</p>;
  }

  const path = route.path || [];

  return (
    <div>
      <h3>Detalle de la ruta</h3>

      <p>📏 Distancia: {route.distanceKm.toFixed(2)} km</p>
      <p>⏱️ Duración: {route.durationMin.toFixed(1)} minutos</p>
      <p>📅 Inicio: {new Date(route.startedAt).toLocaleString()}</p>
      <p>🏁 Fin: {new Date(route.endedAt).toLocaleString()}</p>

      {path.length > 0 && (
        <MapContainer
          center={[path[0].lat, path[0].lng]}
          zoom={14}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Polyline positions={path.map(p => [p.lat, p.lng])} />

          <Marker position={[path[0].lat, path[0].lng]} />
        </MapContainer>
      )}
    </div>
  );
}
