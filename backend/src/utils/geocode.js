import axios from "axios";

export async function geocodeAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;

  const res = await axios.get(url, {
    headers: {
      "User-Agent": "geoapp-nancy"
    }
  });

  if (!res.data || res.data.length === 0) {
    throw new Error("No se pudo convertir la dirección a coordenadas");
  }

  return {
    lat: parseFloat(res.data[0].lat),
    lng: parseFloat(res.data[0].lon),
  };
}
