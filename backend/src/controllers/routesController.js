import TrackPoint from "../models/TrackPoint.js";
import Route from "../models/Route.js";
import { haversine } from "../utils/haversine.js";

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

    const route = await Route.create({
      userId,
      distanceKm,
      durationMin,
      startedAt,
      endedAt,
    });

    res.json(route);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creando ruta" });
  }
};

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
