import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
import TrackPoint from "./src/models/TrackPoint.js";

const PORT = process.env.PORT || 3001;

// 1️⃣ Crear servidor HTTP
const server = http.createServer(app);

// 2️⃣ Configurar Socket.IO
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

// 3️⃣ Conexión real con GPS
io.on("connection", (socket) => {
  console.log("🟢 Cliente conectado:", socket.id);

  // 📍 Recibir ubicación desde el frontend
  socket.on("location:update", async (data) => {
    try {
      console.log("📥 Ubicación recibida:", data);

      if (!data?.lat || !data?.lng) {
        console.log("⏸️ Coordenadas inválidas");
        return;
      }

      // 👉 Guardar en base de datos
      const savedPoint = await TrackPoint.create({
        userId: 1, // temporal (luego puedes usar usuario real)
        lat: data.lat,
        lng: data.lng,
      });

      console.log("💾 Punto guardado:", savedPoint.lat, savedPoint.lng);

      // 👉 Enviar a todos los clientes conectados
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

// 4️⃣ Levantar servidor
server.listen(PORT, () => {
  console.log(`🚀 Backend + Socket.IO corriendo en puerto ${PORT}`);
});
