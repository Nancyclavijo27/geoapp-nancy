import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://geoapp-nancy.onrender.com"
      : "http://localhost:3001",
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
  config.headers["Authorization"] = `Bearer ${token}`; // ← CORRECCIÓN
}

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

