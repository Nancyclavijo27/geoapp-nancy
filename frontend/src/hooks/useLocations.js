import { useState, useEffect } from "react";
import { getLocations, createLocation, updateLocation, deleteLocation } from "../api/locationsApi";

export function useLocations() {
  const [locations, setLocations] = useState([]);

  const loadLocations = async () => {
    const res = await getLocations();
    setLocations(res.data);
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
