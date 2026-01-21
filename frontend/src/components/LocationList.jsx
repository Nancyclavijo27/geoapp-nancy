import React from "react";

export default function LocationList({ locations, onDelete }) {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="location-list">
      <h3>Listado de ubicaciones</h3>

      <ul>
        {locations.map((loc) => (
          <li key={loc.id}>
            <strong>{loc.name || "Sin nombre"}</strong>
            <br />
            📍 {loc.address || "Sin dirección registrada"}

            {isAuthenticated && (
              <button onClick={() => onDelete(loc.id)}>
                Eliminar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
