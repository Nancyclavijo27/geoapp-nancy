// frontend/src/components/LocationForm.jsx
import React, { useState, useEffect } from "react";

const initialForm = { id: null, name: "", lat: "", lng: "", info: "" };

export default function LocationForm({ onAdd, onEdit, editingLocation }) {
  const [form, setForm] = useState(initialForm);
  const isEditing = !!editingLocation;

  useEffect(() => {
    if (editingLocation) {
      setForm(editingLocation);
    } else {
      setForm(initialForm);
    }
  }, [editingLocation]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || form.lat === "" || form.lng === "") {
      alert("Completa nombre, lat y lng");
      return;
    }

    if (isEditing) {
      onEdit(form.id, form);
    } else {
      onAdd(form);
    }

    setForm(initialForm);
  };

  return (
    <div className="location-form">
      <h3>{isEditing ? "Editar ubicación" : "Agregar nueva ubicación"}</h3>

      <form onSubmit={handleSubmit} className="form-grid">
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          name="lat"
          type="number"
          step="0.000001"
          placeholder="Latitud"
          value={form.lat}
          onChange={(e) => setForm({ ...form, lat: e.target.value })}
          required
        />

        <input
          name="lng"
          type="number"
          step="0.000001"
          placeholder="Longitud"
          value={form.lng}
          onChange={(e) => setForm({ ...form, lng: e.target.value })}
          required
        />

        <input
          name="info"
          placeholder="Información (opcional)"
          value={form.info}
          onChange={(e) => setForm({ ...form, info: e.target.value })}
        />

        <button type="submit">
          {isEditing ? "Guardar cambios" : "Agregar ubicación"}
        </button>

        {isEditing && (
          <button type="button" onClick={() => setForm(initialForm)}>
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
}
