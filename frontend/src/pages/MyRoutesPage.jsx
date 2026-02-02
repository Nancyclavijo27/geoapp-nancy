import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyRoutes } from "../api/routesApi";
import RouteList from "../components/RouteList";
import styles from "./MyRoutesPage.module.css";

export default function MyRoutesPage() {
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyRoutes()
      .then(res => setRoutes(res.data))
      .catch(console.error);
  }, []);

  return (
   <main className={styles.page}>
  <header className={styles.header}>
    <h1>Mis rutas</h1>
  </header>

  {routes.length === 0 ? (
    <p className={styles.empty}>No tienes rutas procesadas aún</p>
  ) : (
    <RouteList
      routes={routes}
      onSelect={(route) => navigate(`/routes/${route.id}`)}
    />
  )}
</main>

  );
}
