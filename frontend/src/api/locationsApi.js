// frontend/src/api/locationsApi.js
import axios from "axios";

const API_URL = "http://localhost:3001/api/locations";

// Obtener todas las ubicaciones
export const getLocations = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Crear nueva ubicación
export const createLocation = async (location) => {
  const res = await axios.post(API_URL, location);
  return res.data;
};

// Actualizar una ubicación existente
export const updateLocation = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedData);
  return res.data;
};

// Eliminar una ubicación
export const deleteLocation = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
