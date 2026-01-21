import api from "./axiosInstance";

// Guardar un punto de track
export const addTrackPoint = (trackData) => api.post("/api/track", trackData);

// Obtener todos los puntos de un usuario
export const getMyTrack = (userId) => api.get(`/api/track`);
