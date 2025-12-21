import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import { socket } from "../api/socket";

// Arreglar iconos Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function MapView({ locations }) {
  const center = locations.length
    ? [locations[0].lat, locations[0].lng]
    : [4.65, -74.06];

  const [livePosition, setLivePosition] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("🟢 Conectado al socket:", socket.id);
    });

    socket.on("location:update", (data) => {
      console.log("📍 Posición recibida:", data);
      setLivePosition(data);
    });

    return () => {
      socket.off("location:update");
    };
  }, []);

  return (
    <MapContainer center={center} zoom={13} className="map-container">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Marcadores guardados */}
      {locations.map((l) => (
        <Marker key={l.id} position={[l.lat, l.lng]}>
          <Popup>
            <strong>{l.name}</strong><br />
            {l.info}<br />
            Lat: {l.lat} — Lng: {l.lng}
          </Popup>
        </Marker>
      ))}

      {/* 🚗 Marcador en tiempo real */}
      {livePosition && (
        <Marker position={[livePosition.lat, livePosition.lng]}>
          <Popup>Movimiento en tiempo real</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
