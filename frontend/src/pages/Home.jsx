import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LocationForm from "../components/LocationForm";
import LocationList from "../components/LocationList";
import MapView from "../components/MapView";
import { useLocations } from "../hooks/useLocations";

export default function Home() {
  const navigate = useNavigate();
  const { locations, addLocation, editLocation, removeLocation } = useLocations();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      {/* 🔹 NAVBAR SIMPLE */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        background: "#eee",
        marginBottom: "20px"
      }}>
        <button onClick={() => navigate("/profile")}>Mi Perfil</button>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </nav>

      <h1>GeoApp Nancy</h1>

      <LocationForm onAdd={addLocation} onEdit={editLocation} />
      <MapView locations={locations} />
      <LocationList locations={locations} onDelete={removeLocation} />
    </div>
  );
}
