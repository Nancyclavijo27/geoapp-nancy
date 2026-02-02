import Card from "./ui/Card";
import Button from "./ui/Button";
import styles from "./RouteList.module.css";

export default function RouteList({ routes, onSelect }) {
  if (!routes || routes.length === 0) {
    return <p>No hay rutas registradas</p>;
  }

  return (
    <Card className={styles.routeList}>
      <h3>Historial de rutas</h3>

      <ul className={styles.list}>
        {routes.map((route) => (
          <li key={route.id} className={styles.item}>
            <Button onClick={() => onSelect(route)} className={styles.routeBtn}>
              📍 {new Date(route.startedAt).toLocaleDateString()} —{" "}
              {route.distanceKm.toFixed(2)} km
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
