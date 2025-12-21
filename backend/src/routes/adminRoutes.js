import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// 👉 RUTA ADMIN DE PRUEBA
router.get(
  "/admin/test",
  authMiddleware,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: "Acceso ADMIN concedido",
      user: req.user,
    });
  }
);

export default router;
