import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";

// 📦 Registro GLOBAL de modelos (arquitectura estable)
import "./models/User.js";
import "./models/locationModel.js";
import "./models/TrackPoint.js";

// 🛣️ Rutas
import locationRoutes from "./routes/locationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import trackRoutes from "./routes/trackRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";


const app = express();

/* ======================
   Middlewares globales
====================== */
const allowedOrigins = [
  "http://localhost:3000",
  "https://geoapp-nancy-frontend.onrender.com"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* ======================
   Rutas de la API
====================== */
app.use("/api/locations", locationRoutes);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/api/user", profileRoutes);
app.use("/api", adminRoutes);
app.use("/api/track", trackRoutes);
app.use("/api", routeRoutes);


/* ======================
   Conexión a Base de Datos
====================== */
async function connectDB() {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Base de datos sincronizada correctamente");
  } catch (error) {
    console.error("❌ Error conectando con la BD:", error);
  }
}

connectDB();

export default app
