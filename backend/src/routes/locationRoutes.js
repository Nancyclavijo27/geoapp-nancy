import express from 'express';
import {
  getLocations,
  createLocation,
  deleteLocation
} from '../controllers/locationController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware); // todos requieren token

router.get('/', getLocations);          // listar ubicaciones
router.post('/', createLocation);       // crear ubicación
router.delete('/:id', deleteLocation);  // eliminar

export default router;
