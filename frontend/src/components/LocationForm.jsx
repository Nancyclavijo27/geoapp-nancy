import { useState, useEffect } from "react";

import Card from "./ui/Card";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";

import styles from "./LocationForm.module.css";

export default function LocationForm({ onAdd, editingLocation }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    if (editingLocation) {
      setName(editingLocation.name || "");
      setAddress(editingLocation.address || "");
      setInfo(editingLocation.info || "");
    }
  }, [editingLocation]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    await onAdd({ name, address, info });

    setName("");
    setAddress("");
    setInfo("");
  };

  return (
    <Card>
      <h2 className={styles.title}>
        {editingLocation ? "Editar ubicación" : "Agregar nueva ubicación"}
      </h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="text"
          placeholder="Nombre del punto (ej: Tienda Don Luis)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Dirección (ej: Carrera 50 #20-30)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Textarea
          placeholder="Información adicional"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />

        <div className={styles.actions}>
          <Button type="submit">
            {editingLocation ? "Guardar cambios" : "Agregar ubicación"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
