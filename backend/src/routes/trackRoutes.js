import { Router } from "express";
import { saveTrackPoint, getRouteByUser, deleteTrackPoint } from "../controllers/trackController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();
router.use(authMiddleware); // todos los endpoints requieren token

router.post("/", saveTrackPoint);         // crear punto
router.get("/", getRouteByUser);          // listar puntos del usuario
router.delete("/:id", deleteTrackPoint);  // eliminar punto

export default router;
