import api from "./axiosInstance";

// ✅ Ruta automática (con GPS / TrackPoints)
export const processRoute = () => {
  return api.post("/api/routes/process");
};

// ✅ Ruta manual (NUEVA)
export const processRouteManual = (locationIds) => {
  return api.post("/api/routes/manual", {
    locations: locationIds
  });
};

// ✅ Obtener rutas del usuario
export const getMyRoutes = () => {
  return api.get("/api/routes/me");
};

export const getRouteById = (id) => {
  return api.get(`/api/routes/${id}`);
};
