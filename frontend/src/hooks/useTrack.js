import { useEffect, useState } from "react";
import { getMyTrack } from "../api/tracksApi";

export default function useTrack(userId) {
  const [track, setTrack] = useState([]); // datos de track
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // opcional, para manejar errores

  useEffect(() => {
    if (!userId) return; // evita hacer la petición sin userId

    const fetchTrack = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getMyTrack(); // llamamos la API con userId
        setTrack(res.data || []);
      } catch (err) {
        console.error("❌ Error cargando track:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
  }, [userId]);

  return { track, loading, error };
}
