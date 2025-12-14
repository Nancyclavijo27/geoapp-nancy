import React from "react";

export default function LocationList({ locations, onEditClick, onDelete }) {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="location-list">
      <h3>Listado de ubicaciones</h3>

      <ul>
        {locations.map((loc) => (
          <li key={loc.id} className="location-item">
            <strong>{loc.name}</strong> — lat: {loc.lat}, lng: {loc.lng}

            {isAuthenticated && (
              <>
                <button onClick={() => onEditClick(loc)}>Editar</button>
                <button onClick={() => onDelete(loc.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
