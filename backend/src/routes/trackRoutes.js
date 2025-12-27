import express from "express";
import { getUserTrack } from "../controllers/trackController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔒 Historial por usuario logueado
router.get("/", authMiddleware, getUserTrack);

export default router;
