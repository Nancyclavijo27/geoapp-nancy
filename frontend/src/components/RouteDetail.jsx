export default function RouteDetail({ route }) {
  if (!route) {
    return <p>Selecciona una ruta para ver el detalle</p>;
  }

  return (
    <div>
      <h3>Detalle de la ruta</h3>

      <p>📏 Distancia: {route.distanceKm.toFixed(2)} km</p>
      <p>⏱️ Duración: {route.durationMin.toFixed(1)} minutos</p>
      <p>📅 Fecha inicio: {new Date(route.startedAt).toLocaleString()}</p>
      <p>🏁 Fecha fin: {new Date(route.endedAt).toLocaleString()}</p>
    </div>
  );
}
