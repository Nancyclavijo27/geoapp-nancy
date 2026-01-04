import api from "./axiosInstance";

// 🔹 crear ruta desde trackpoints
export const processRoute = () => {
  return api.post("/api/routes/process");
};

// 🔹 obtener rutas del usuario
export const getMyRoutes = () => {
  return api.get("/api/routes/me");
};
