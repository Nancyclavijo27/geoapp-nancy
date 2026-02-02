import React from "react";
import styles from "./LocationList.module.css";
import Button from "./ui/Button";
import Card from "./ui/Card";

export default function LocationList({ locations, onDelete }) {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Card>
      <h3 className={styles.title}>Listado de ubicaciones</h3>

      <ul className={styles.list}>
        {locations.map((loc) => (
          <li key={loc.id} className={styles.item}>
            <div>
              <strong>{loc.name || "Sin nombre"}</strong>
              <div className={styles.address}>
                📍 {loc.address || "Sin dirección registrada"}
              </div>
            </div>

            {isAuthenticated && (
              <Button onClick={() => onDelete(loc.id)}>
                Eliminar
              </Button>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}
