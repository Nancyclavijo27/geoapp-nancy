import { useEffect, useState } from "react";
import { getMyTrack } from "../api/tracksApi";

export default function useTrack() {
  const [track, setTrack] = useState([]); // 👈 CLAVE
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await getMyTrack();
        setTrack(res.data || []);
      } catch (error) {
        console.error("❌ Error cargando track:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
  }, []);

  return { track, loading };
}
