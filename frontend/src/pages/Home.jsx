import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LocationForm from "../components/LocationForm";
import LocationList from "../components/LocationList";
import MapView from "../components/MapView";

import { useLocations } from "../hooks/useLocations";
import { isAdmin, logout } from "../utils/auth";

export default function Home() {
  const navigate = useNavigate();
  const { locations, addLocation, editLocation, removeLocation } = useLocations();

  // 🔹 Verificar token al cargar
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      navigate("/login", { replace: true });
      return;
    }

    // Opcional: si quieres redirigir usuarios normales lejos de admin
    // if (!isAdmin() && window.location.pathname === "/admin") {
    //   navigate("/home", { replace: true });
    // }
  }, [navigate]);

  // 🔹 Función para verificar admin
  const admin = isAdmin(); // Debe devolver true si el usuario es admin

  return (
    <div>
      {/* 🔹 NAVBAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          background: "#eee",
          marginBottom: "20px"
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
            logout(); // Limpia token y usuario
            navigate("/login", { replace: true });
          }}
        >
          Cerrar sesión
        </button>
      </nav>

      {/* 🔹 CONTENIDO */}
      <h1>GeoApp Nancy</h1>

      <LocationForm onAdd={addLocation} onEdit={editLocation} />
      <MapView locations={locations} />
      <LocationList
        locations={locations}
        onDelete={removeLocation}
      />
    </div>
  );
}
