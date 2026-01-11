import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LocationForm from "../components/LocationForm";
import LocationList from "../components/LocationList";
import MapView from "../components/MapView";

import { useLocations } from "../hooks/useLocations";
import useLiveLocation from "../hooks/useLiveLocation";

import { isAdmin, logout } from "../utils/auth";

export default function Home() {
  const navigate = useNavigate();
  const { locations, addLocation, editLocation, removeLocation } = useLocations();

  /* ======================================================
     🔴 GPS REAL (OPCIONAL – LISTO PERO APAGADO)
     ====================================================== */
  const [tracking, setTracking] = useState(false);
  const { position, error } = useLiveLocation(tracking);

  // 🧪 SOLO PARA PRUEBAS: ver si el GPS está funcionando
  useEffect(() => {
    if (position) {
      console.log("📍 GPS real activo:", position);
    }
    if (error) {
      console.error("❌ Error GPS:", error);
    }
  }, [position, error]);

  /* ======================================================
     🔐 Verificar sesión
     ====================================================== */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      navigate("/login", { replace: true });
      return;
    }
  }, [navigate]);

  const admin = isAdmin();

  return (
    <div>
      {/* 🔹 NAVBAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          background: "#eee",
          marginBottom: "20px",
        }}
      >
        <div>
          <button onClick={() => navigate("/profile")}>
            Mi Perfil
          </button>

          {admin && (
            <button
              onClick={() => navigate("/admin")}
              style={{ marginLeft: "10px" }}
            >
              Panel Admin
            </button>
          )}
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/login", { replace: true });
          }}
        >
          Cerrar sesión
        </button>
      </nav>

      {/* 🔹 CONTENIDO */}
      <h1>GeoApp Nancy</h1>

      {/* 🔧 GPS REAL – SOLO PARA DESARROLLO / PRUEBAS */}
      {process.env.NODE_ENV === "development" && (
        <div style={{ marginBottom: "15px" }}>
          <button onClick={() => setTracking(true)}>
            ▶️ Iniciar GPS real
          </button>

          <button
            onClick={() => setTracking(false)}
            style={{ marginLeft: "10px" }}
          >
            ⏹️ Detener GPS
          </button>
        </div>
      )}

      <LocationForm onAdd={addLocation} onEdit={editLocation} />
      <MapView locations={locations} />
      <LocationList
        locations={locations}
        onDelete={removeLocation}
      />
    </div>
  );
}
