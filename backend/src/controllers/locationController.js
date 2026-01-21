import Location from "../models/locationModel.js";

/**
 * ===========================
 * CREAR UBICACIÓN
 * ===========================
 */
export const createLocation = async (req, res) => {
  try {
    const { name, address } = req.body;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    const location = await Location.create({
      name,
      address: address || null,
      userId,
      lat: null,
      lng: null,
    });

    console.log("💾 Ubicación creada:", location.id);

    res.status(201).json(location);
  } catch (error) {
    console.error("❌ Error creando ubicación:", error);
    res.status(500).json({ error: "Error creando ubicación" });
  }
};

/**
 * ===========================
 * OBTENER UBICACIONES
 * ===========================
 */
export const getLocations = async (req, res) => {
  try {
    const userId = req.user.id;

    const locations = await Location.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    res.json(locations);
  } catch (error) {
    console.error("❌ Error obteniendo ubicaciones:", error);
    res.status(500).json({ error: "Error obteniendo ubicaciones" });
  }
};

/**
 * ===========================
 * ELIMINAR UBICACIÓN
 * ===========================
 */
export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const location = await Location.findOne({
      where: { id, userId },
    });

    if (!location) {
      return res.status(404).json({ error: "Ubicación no encontrada" });
    }

    await location.destroy();

    res.json({ message: "Ubicación eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error eliminando ubicación:", error);
    res.status(500).json({ error: "Error eliminando ubicación" });
  }
};
