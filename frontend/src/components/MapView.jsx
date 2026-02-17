import "leaflet/dist/leaflet.css";
import styles from "./MapView.module.css";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import { socket } from "../api/socket";
import useTrack from "../hooks/useTrack";
import useLiveLocation from "../hooks/useLiveLocation";


// 🔧 Arreglar iconos Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function MapView({ locations = [] }) {
  // 📍 Centro del mapa
  const center = locations.length
    ? [locations[0].lat, locations[0].lng]
    : [4.65, -74.06];

  // 📜 Historial desde backend
  const { track = [] } = useTrack();
  const { position, error } = useLiveLocation(true);


  // 🚗 Posición en tiempo real
  const [livePosition, setLivePosition] = useState(null);

  // 📐 Línea del recorrido (historial)
  const polylinePositions = track.map(p => [p.lat, p.lng]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("🟢 Socket conectado:", socket.id);
    });

    socket.on("location:update", (data) => {
      console.log("📍 Posición recibida:", data);
      setLivePosition(data);
    });

    return () => {
      socket.off("location:update");
    };
  }, []);

  useEffect(() => {
  if (position) {
    console.log("📤 Enviando ubicación:", position);
    socket.emit("location:update", position);
  }
}, [position]);


  return (
    <MapContainer center={center} zoom={13} className={styles.map}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 📍 Marcadores fijos */}
      {locations.map((l) => (
        <Marker key={l.id} position={[l.lat, l.lng]}>
          <Popup>
            <strong>{l.name}</strong><br />
            {l.info}<br />
            Lat: {l.lat} — Lng: {l.lng}
          </Popup>
        </Marker>
      ))}

      {/* 🔴 HISTORIAL COMPLETO (línea roja) */}
      {polylinePositions.length > 1 && (
        <Polyline positions={polylinePositions} pathOptions={{ color: "red" }} />
      )}

      {/* 🚗 Movimiento en tiempo real */}
      {livePosition && (
        <Marker position={[livePosition.lat, livePosition.lng]}>
          <Popup>Movimiento en tiempo real</Popup>
        </Marker>
      )}

      {position && (
  <Marker position={[position.lat, position.lng]}>
    <Popup>Mi ubicación actual</Popup>
  </Marker>
)}

    </MapContainer>
  );
}
