import TrackPoint from "../models/TrackPoint.js";
import Route from "../models/Route.js";
import { haversine } from "../utils/haversine.js";

// =====================================================
// ✅ 1) RUTA POR GPS (YA LA TENÍAS — NO SE TOCA)
// =====================================================
export const createRouteFromTrack = async (req, res) => {
  try {
    const userId = req.user.id;

    const points = await TrackPoint.findAll({
      where: { userId },
      order: [["createdAt", "ASC"]],
    });

    if (points.length < 2) {
      return res.status(400).json({ message: "No hay suficientes puntos" });
    }

    let distanceKm = 0;

    for (let i = 1; i < points.length; i++) {
      distanceKm += haversine(
        points[i - 1].lat,
        points[i - 1].lng,
        points[i].lat,
        points[i].lng
      );
    }

    const startedAt = points[0].createdAt;
    const endedAt = points[points.length - 1].createdAt;
    const durationMin = (endedAt - startedAt) / 1000 / 60;

    // 👉 Creamos también el path para el mapa
    const path = points.map(p => ({
      lat: p.lat,
      lng: p.lng
    }));

    const route = await Route.create({
      userId,
      distanceKm,
      durationMin,
      startedAt,
      endedAt,
      path            // 👈 NUEVO (muy importante)
    });

    res.json(route);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creando ruta" });
  }
};

// =====================================================
// ✅ 2) RUTA MANUAL (NUEVA) — EN EL MISMO ARCHIVO
// =====================================================
export const createRouteFromManualPoints = async (req, res) => {
  try {
    const userId = req.user.id;
    const { locations } = req.body; // ids de puntos manuales

    if (!locations || locations.length < 2) {
      return res.status(400).json({
        message: "Debes enviar al menos 2 puntos manuales"
      });
    }

    const points = await TrackPoint.findAll({
      where: { id: locations }
    });

    const path = points.map(p => ({
      lat: p.lat,
      lng: p.lng
    }));

    const distanceKm = points.length * 0.8;

    const route = await Route.create({
      userId,
      distanceKm,
      durationMin: distanceKm * 1.2,
      startedAt: new Date(),
      endedAt: new Date(),
      path
    });

    res.json(route);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creando ruta manual" });
  }
};

// =====================================================
// ✅ 3) LISTAR RUTAS (YA LA TENÍAS — NO SE TOCA)
// =====================================================
export const getUserRoutes = async (req, res) => {
  try {
    const userId = req.user.id;

    const routes = await Route.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    res.json(routes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo rutas" });
  }
};

// =====================================================
// ✅ 4) OBTENER UNA SOLA RUTA POR ID (PARA EL DETALLE)
// =====================================================
export const getRouteById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const route = await Route.findOne({
      where: { id, userId }
    });

    if (!route) {
      return res.status(404).json({ message: "Ruta no encontrada" });
    }

    res.json(route);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo ruta" });
  }
};

