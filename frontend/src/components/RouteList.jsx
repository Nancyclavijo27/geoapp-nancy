export default function RouteList({ routes, onSelect }) {
  if (!routes || routes.length === 0) {
    return <p>No hay rutas registradas</p>;
  }

  return (
    <div>
      <h3>Historial de rutas</h3>

      <ul>
        {routes.map((route) => (
          <li key={route.id}>
            <button onClick={() => onSelect(route)}>
              📍 {new Date(route.startedAt).toLocaleDateString()} —{" "}
              {route.distanceKm.toFixed(2)} km
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
