import TrackPoint from "../models/TrackPoint.js";
import { geocodeAddress } from "../utils/geocode.js"; // opcional, si quieres dirección->lat/lng

// ==========================
// Guardar punto de GPS o dirección
// ==========================
export const saveTrackPoint = async (req, res) => {
  try {
    const { lat, lng, name, address } = req.body;
    const userId = req.user.id;

    let finalLat = lat;
    let finalLng = lng;

    // Si envían dirección en lugar de lat/lng
    if (address && (!lat || !lng)) {
      const geo = await geocodeAddress(address); // retorna {lat, lng}
      if (!geo) return res.status(400).json({ message: "No se pudo convertir dirección a coordenadas" });
      finalLat = geo.lat;
      finalLng = geo.lng;
    }

    const point = await TrackPoint.create({
      userId,
      lat: finalLat,
      lng: finalLng,
      name: name || address || null,
    });

    res.status(201).json(point);
  } catch (error) {
    console.error("Error guardando punto:", error);
    res.status(500).json({ message: "Error guardando punto" });
  }
};

// ==========================
// Obtener todos los puntos del usuario
// ==========================
export const getRouteByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const points = await TrackPoint.findAll({
      where: { userId },
      order: [["createdAt", "ASC"]],
    });

    res.json(points);
  } catch (error) {
    console.error("Error obteniendo ruta:", error);
    res.status(500).json({ message: "Error obteniendo ruta" });
  }
};

// ==========================
// Eliminar punto (solo del usuario)
// ==========================
export const deleteTrackPoint = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const point = await TrackPoint.findOne({ where: { id, userId } });
    if (!point) return res.status(404).json({ message: "Punto no encontrado o no es tuyo" });

    await point.destroy();
    res.json({ message: "Punto eliminado" });
  } catch (error) {
    console.error("Error eliminando punto:", error);
    res.status(500).json({ message: "Error eliminando punto" });
  }
};
