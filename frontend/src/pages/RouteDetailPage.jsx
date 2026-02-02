import { useParams, useNavigate } from "react-router-dom";
import RouteDetail from "../components/RouteDetail";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import styles from "./RouteDetailPage.module.css";

export default function RouteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Detalle de la ruta</h1>

        <Card>
          <RouteDetail routeId={id} />
        </Card>

        <div className={styles.actions}>
          <Button onClick={() => navigate(-1)}>
            ← Volver
          </Button>
        </div>
      </div>
    </main>
  );
}
