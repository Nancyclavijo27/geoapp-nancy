import Location from "../models/locationModel.js";

// Crear ubicación
export const createLocation = async (req, res) => {
  try {
    const newLoc = await Location.create(req.body);
    res.json(newLoc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creando ubicación" });
  }
};

// Obtener todas en GEOJSON  ⬅️ ESTE ES EL CAMBIO IMPORTANTE
export const getLocations = async (req, res) => {
  try {
    const locs = await Location.findAll();

    const geojson = {
      type: "FeatureCollection",
      features: locs.map(loc => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [loc.lng, loc.lat] // (lng, lat)
        },
        properties: {
          id: loc.id,
          name: loc.name,
          info: loc.info
        }
      }))
    };

    res.json(geojson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo ubicaciones" });
  }
};


// Actualizar
export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const loc = await Location.findByPk(id);
    if (!loc) return res.status(404).json({ error: "No encontrada" });
    await loc.update(req.body);
    res.json(loc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error actualizando ubicación" });
  }
};

// Eliminar
export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const loc = await Location.findByPk(id);
    if (!loc) return res.status(404).json({ error: "No encontrada" });
    await loc.destroy();
    res.json({ message: "Ubicación eliminada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error eliminando ubicación" });
  }
};
