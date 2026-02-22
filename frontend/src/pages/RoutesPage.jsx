import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocations } from "../hooks/useLocations";
import { processRoute, processRouteManual } from "../api/routesApi";

import LocationForm from "../components/LocationForm";
import LocationList from "../components/LocationList";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import styles from "./RoutesPage.module.css";

export default function RoutesPage() {
  const navigate = useNavigate();

  const {
    locations,
    addLocation,
    removeLocation,
  } = useLocations();

  const [editingLocation, setEditingLocation] = useState(null);
  const [error, setError] = useState(""); // 👈 NUEVO

  // ===========================
  // CREAR UBICACIÓN
  // ===========================
  const handleAdd = async (data) => {
    try {
      await addLocation(data);
      setError("");
    } catch (err) {
      console.error("Error agregando ubicación:", err);
      setError("No se pudo agregar la ubicación");
    }
  };

  // ===========================
  // ELIMINAR UBICACIÓN
  // ===========================
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este punto?")) return;

    try {
      await removeLocation(id);
      setError("");
    } catch (err) {
      console.error("Error eliminando ubicación:", err);
      setError("No se pudo eliminar el punto");
    }
  };

  // ===========================
  // RUTA AUTOMÁTICA (GPS)
  // ===========================
  const handleProcessAutomatic = async () => {
    try {
      setError("");

      await processRoute();

      alert("Ruta generada correctamente ✅");
      navigate("/my-routes");

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Necesitas al menos 2 puntos GPS para generar la ruta"
      );
    }
  };

  // ===========================
  // RUTA MANUAL
  // ===========================
  const handleProcessManual = async () => {
    try {
      const ids = locations.map((loc) => loc.id);

      if (ids.length < 2) {
        setError("Debes tener al menos 2 puntos manuales");
        return;
      }

      setError("");

      await processRouteManual(ids);

      alert("Ruta creada correctamente ✅");
      navigate("/my-routes");

    } catch (err) {
      console.error(err);
      setError("Error creando ruta manual");
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Gestión de rutas</h1>

        {/* Mostrar error */}
        {error && (
          <p style={{ color: "red", marginBottom: "15px" }}>
            {error}
          </p>
        )}

        {/* FORM + LIST */}
        <div className={styles.content}>
          <Card>
            <LocationForm
              onAdd={handleAdd}
              editingLocation={editingLocation}
            />
          </Card>

          <Card>
            <LocationList
              locations={locations}
              onDelete={handleDelete}
              onEdit={(loc) => setEditingLocation(loc)}
            />
          </Card>
        </div>

        {/* BOTONES */}
        {locations.length >= 2 && (
          <div className={styles.actions}>
            <Button onClick={handleProcessManual}>
              ✅ Crear ruta con MIS puntos
            </Button>

            <Button onClick={handleProcessAutomatic}>
              ⚙️ Procesar ruta con GPS
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}