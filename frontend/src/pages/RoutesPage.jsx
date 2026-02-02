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

  // ===========================
  // CREAR UBICACIÓN
  // ===========================
  const handleAdd = async (data) => {
    try {
      await addLocation(data);
    } catch (err) {
      console.error("Error agregando ubicación:", err);
      alert("No se pudo agregar la ubicación");
    }
  };

  // ===========================
  // ELIMINAR UBICACIÓN
  // ===========================
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este punto?")) return;

    try {
      await removeLocation(id);
    } catch (err) {
      console.error("Error eliminando ubicación:", err);
      alert("No se pudo eliminar");
    }
  };

  // ===========================
  // RUTAS
  // ===========================
  const handleProcessAutomatic = async () => {
    try {
      await processRoute();
      alert("Ruta procesada automáticamente");
      navigate("/my-routes");
    } catch (err) {
      console.error(err);
      alert("Error procesando la ruta automática");
    }
  };

  const handleProcessManual = async () => {
    try {
      const ids = locations.map((loc) => loc.id);

      if (ids.length < 2) {
        alert("Debes tener al menos 2 puntos");
        return;
      }

      await processRouteManual(ids);
      alert("Ruta creada con tus puntos");
      navigate("/my-routes");
    } catch (err) {
      console.error(err);
      alert("Error creando ruta manual");
    }
  };

  return (
    <main className={styles.page}>
  <div className={styles.container}>
    <h1 className={styles.title}>Gestión de rutas</h1>

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
