import { useState, useEffect, useCallback } from "react";
import {
  getLocations,
  createLocation,
  deleteLocation,
} from "../api/locationsApi";

export const useLocations = () => {
  const [locations, setLocations] = useState([]);

  // ===========================
  // CARGAR UBICACIONES
  // ===========================
  const loadLocations = useCallback(async () => {
    try {
      const data = await getLocations(); // Esto ya devuelve un array plano del backend

      // ✅ Mapear directamente los datos para usar en React
      const parsed = data.map((loc) => ({
        id: loc.id,
        name: loc.name,
        address: loc.address,
        info: loc.info,
        lat: loc.lat,
        lng: loc.lng,
      }));

      setLocations(parsed);
    } catch (error) {
      console.error("❌ Error cargando ubicaciones:", error);
      setLocations([]);
    }
  }, []);

  useEffect(() => {
    loadLocations();
  }, [loadLocations]);

  // ===========================
  // AGREGAR UBICACIÓN
  // ===========================
  const addLocation = async (data) => {
    await createLocation(data);
    await loadLocations(); // 🔑 refresca la lista después de agregar
  };

  // ===========================
  // ELIMINAR UBICACIÓN
  // ===========================
  const removeLocation = async (id) => {
    await deleteLocation(id);
    setLocations((prev) => prev.filter((l) => l.id !== id));
  };

  return {
    locations,
    loadLocations,
    addLocation,
    removeLocation,
  };
};
