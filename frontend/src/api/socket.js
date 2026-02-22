import { io } from "socket.io-client";

const SOCKET_URL = "https://geoapp-nancy.onrender.com";

// 👇 Tomamos el token del login
const token = localStorage.getItem("token");

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,
  auth: {
    token, // 👈 enviamos el token al backend
  },
});