// frontend/src/hooks/useLocations.js
import { useState, useEffect } from "react";
import { getLocations, createLocation, updateLocation, deleteLocation } from "../api/locationsApi";

export function useLocations() {
  const [locations, setLocations] = useState([]);

  const loadLocations = async () => {
    const geo = await getLocations(); 

    // 🔥 Convertir GeoJSON → lista normal
    const parsed = geo.features.map(f => ({
      id: f.properties.id,
      name: f.properties.name,
      info: f.properties.info,
      lat: Number(f.geometry.coordinates[1]),
      lng: Number(f.geometry.coordinates[0]),
    }));

    setLocations(parsed);
  };

  const addLocation = async (data) => {
    await createLocation(data);
    loadLocations();
  };

  const editLocation = async (id, data) => {
    await updateLocation(id, data);
    loadLocations();
  };

  const removeLocation = async (id) => {
    await deleteLocation(id);
    loadLocations();
  };

  useEffect(() => {
    loadLocations();
  }, []);

  return { locations, addLocation, editLocation, removeLocation };
}
