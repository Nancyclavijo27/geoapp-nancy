import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import app from "./src/app.js";
import TrackPoint from "./src/models/TrackPoint.js";

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:3000",
  "https://geoapp-nancy-frontend.onrender.com"
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// 🔐 Middleware para validar token del socket
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("No token"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.user = decoded; // 👈 guardamos usuario en el socket

    next();
  } catch (err) {
    next(new Error("Token inválido"));
  }
});

// 🔵 Conexión
io.on("connection", (socket) => {
  console.log("🟢 Cliente conectado:", socket.id);

  socket.on("location:update", async (data) => {
    try {
      if (!data?.lat || !data?.lng) return;

      const savedPoint = await TrackPoint.create({
        userId: socket.user.id, // 👈 AQUÍ ESTÁ EL CAMBIO IMPORTANTE
        lat: data.lat,
        lng: data.lng,
      });

      io.emit("location:update", {
        lat: savedPoint.lat,
        lng: savedPoint.lng,
      });

    } catch (error) {
      console.error("❌ Error guardando punto:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Cliente desconectado:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Backend + Socket.IO corriendo en puerto ${PORT}`);
});