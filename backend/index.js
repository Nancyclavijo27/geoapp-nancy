import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
import TrackPoint from "./src/models/TrackPoint.js";

const PORT = process.env.PORT || 3001;

// 1️⃣ Servidor HTTP
const server = http.createServer(app);

// 2️⃣ Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// 🔁 Ruta simulada
const route = [
  { lat: 4.60971, lng: -74.08175 },
  { lat: 4.6103, lng: -74.0823 },
  { lat: 4.6112, lng: -74.0831 },
  { lat: 4.6121, lng: -74.084 },
];

let index = 0;

io.on("connection", (socket) => {
  console.log("🟢 Socket conectado:", socket.id);

  const interval = setInterval(async () => {
    try {
      const point = route[index];

      if (!point?.lat || !point?.lng) {
        console.log("⏸️ Coordenadas inválidas");
        return;
      }

      // 👉 Guardar en BD
      const savedPoint = await TrackPoint.create({
        userId: 1, // temporal
        lat: point.lat,
        lng: point.lng,
      });

      // 🔴 ESTE ES EL CONSOLE.LOG CLAVE
      console.log(
        "💾 Punto guardado:",
        savedPoint.lat,
        savedPoint.lng
      );

      // 👉 Enviar al frontend
      socket.emit("location:update", {
        lat: savedPoint.lat,
        lng: savedPoint.lng,
      });

      index = (index + 1) % route.length;

    } catch (error) {
      console.error("❌ Error guardando punto:", error);
    }
  }, 2000);

  socket.on("disconnect", () => {
    console.log("🔴 Socket desconectado:", socket.id);
    clearInterval(interval);
  });
});

// 3️⃣ Levantar servidor
server.listen(PORT, () => {
  console.log(`🚀 Backend + Socket.IO corriendo en http://localhost:${PORT}`);
});
