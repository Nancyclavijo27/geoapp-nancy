let locations = [
  { id: 1, name: "Parque Simón Bolívar", lat: 4.6584, lng: -74.0935, info: "Bogotá" },
];

export const getLocations = (req, res) => {
  res.json(locations);
};

export const createLocation = (req, res) => {
  const { name, lat, lng, info } = req.body;
  const newLocation = {
    id: locations.length + 1,
    name,
    lat: parseFloat(lat),
    lng: parseFloat(lng),
    info
  };
  locations.push(newLocation);
  res.status(201).json(newLocation);
};

export const updateLocation = (req, res) => {
  const { id } = req.params;
  const { name, lat, lng, info } = req.body;
  const index = locations.findIndex(loc => loc.id === parseInt(id));
  if (index === -1) return res.status(404).json({ message: 'Ubicación no encontrada' });

  locations[index] = { id: parseInt(id), name, lat, lng, info };
  res.json(locations[index]);
};

export const deleteLocation = (req, res) => {
  const { id } = req.params;
  locations = locations.filter(loc => loc.id !== parseInt(id));
  res.json({ message: 'Ubicación eliminada' });
};
