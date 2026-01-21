import { Router } from "express";
import {
  createRouteFromTrack,
  createRouteFromManualPoints,   // 👈 NUEVO
  getUserRoutes,
  getRouteById
} from "../controllers/routesController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// ✅ Ruta por GPS (ya existía)
router.post("/routes/process", authMiddleware, createRouteFromTrack);

// ✅ Ruta MANUAL (nueva)
router.post("/routes/manual", authMiddleware, createRouteFromManualPoints);

// ✅ Listar rutas del usuario
router.get("/routes/me", authMiddleware, getUserRoutes);

router.get("/routes/:id", authMiddleware, getRouteById);

export default router;
