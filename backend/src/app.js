import express from "express";
import cors from "cors";
import locationRoutes from "./routes/locationRoutes.js";
import sequelize from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/locations", locationRoutes);

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
