import express from "express";
import cors from "cors";
import locationRoutes from "./routes/locationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import sequelize from "./config/db.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/locations", locationRoutes);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/api/user", profileRoutes);

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
