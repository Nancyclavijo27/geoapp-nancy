import React, { useState } from "react";
import LocationForm from "../components/LocationForm";
import LocationList from "../components/LocationList";
import MapView from "../components/MapView";
import { useLocations } from "../hooks/useLocations";

export default function Home() {
  const { locations, addLocation, editLocation, removeLocation } = useLocations();
  const [editingLocation, setEditingLocation] = useState(null);

  return (
    <div>
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
