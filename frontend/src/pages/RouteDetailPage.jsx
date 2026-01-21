import { useParams, useNavigate } from "react-router-dom";
import RouteDetail from "../components/RouteDetail";

export default function RouteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <main>
      <h1>Detalle de la ruta</h1>

      <RouteDetail routeId={id} />

      <button onClick={() => navigate(-1)}>
        Volver
      </button>
    </main>
  );
}
