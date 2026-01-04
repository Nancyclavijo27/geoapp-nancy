import { Router } from "express";
import {
  createRouteFromTrack,
  getUserRoutes,
} from "../controllers/routesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// Procesar puntos → ruta
router.post("/routes/process", authMiddleware, createRouteFromTrack);

// Listar rutas del usuario
router.get("/routes/me", authMiddleware, getUserRoutes);

export default router;
