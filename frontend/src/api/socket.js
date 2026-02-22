import { io } from "socket.io-client";

const SOCKET_URL = "https://geoapp-nancy.onrender.com";

export const socket = io(SOCKET_URL, {
  autoConnect: false,          // 🔥 no conectar automáticamente
  transports: ["websocket"],
});