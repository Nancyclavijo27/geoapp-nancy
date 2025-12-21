import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
import TrackPoint from "./src/models/TrackPoint.js";

const PORT = process.env.PORT || 3001;

// 1️⃣ Crear servidor HTTP desde Express
const server = http.createServer(app);

// 2️⃣ Conectar Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// 🔁 Simulación temporal de movimiento (DOMINGO 8)
const route = [
  { lat: 4.60971, lng: -74.08175 },
  { lat: 4.6103, lng: -74.0823 },
  { lat: 4.6112, lng: -74.0831 },
  { lat: 4.6121, lng: -74.084 },
];

let index = 0;

io.on("connection", (socket) => {
  console.log("🟢 Socket conectado:", socket.id);

  // 🔁 Simulación SOLO para pruebas
  const interval = setInterval(async () => {
    const data = {
      userId: 1, // temporal (luego vendrá del usuario real)
      lat: route[index].lat,
      lng: route[index].lng,
    };

    // ✅ Guardar historial de trayecto
    await TrackPoint.create({
      userId: data.userId,
      latitude: data.lat,
      longitude: data.lng,
    });

    // ✅ Enviar posición al frontend
    socket.emit("location:update", data);

    index = (index + 1) % route.length;
  }, 2000);

  socket.on("disconnect", () => {
    console.log("🔴 Socket desconectado:", socket.id);
    clearInterval(interval);
  });
});

// 3️⃣ Levantar TODO
server.listen(PORT, () => {
  console.log(`🚀 Backend + Socket.IO corriendo en http://localhost:${PORT}`);
});
