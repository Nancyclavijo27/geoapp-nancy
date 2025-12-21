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

const app = express();

/* ======================
   Middlewares globales
====================== */
app.use(cors());
app.use(express.json());

/* ======================
   Rutas de la API
====================== */
app.use("/api/locations", locationRoutes);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/api/user", profileRoutes);
app.use("/api", adminRoutes);

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

export default app;
