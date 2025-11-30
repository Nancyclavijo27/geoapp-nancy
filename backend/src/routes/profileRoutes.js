import { Router } from "express";
import { getProfile } from "../controllers/PerfilController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/perfil", authMiddleware, getProfile);

export default router;
