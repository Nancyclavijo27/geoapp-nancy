import { useEffect, useState } from "react";
import { getMyRoutes } from "../api/routesApi";

export default function useRoutes() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await getMyRoutes();
        setRoutes(res.data || []);
      } catch (error) {
        console.error("❌ Error cargando rutas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  return { routes, loading };
}
