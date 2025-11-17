import React, { useState } from "react";
import LocationForm from "../components/LocationForm";
import LocationList from "../components/LocationList";
import MapView from "../components/MapView";
import { useLocations } from "../hooks/useLocations";
import Register from "../components/Register"; // ✅ importamos

export default function Home() {
  const { locations, addLocation, editLocation, removeLocation } = useLocations();
  const [editingLocation, setEditingLocation] = useState(null);

  return (
    <div>
       <Register /> {/* ✅ formulario de registro */}
      <LocationForm
        onAdd={addLocation}
        onEdit={editLocation}
        editingLocation={editingLocation}
      />

      <MapView locations={locations} />

      <LocationList
        locations={locations}
        onEditClick={(loc) => setEditingLocation(loc)}
        onDelete={removeLocation}
      />
    </div>
  );
}
