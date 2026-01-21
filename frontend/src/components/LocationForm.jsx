import { useState, useEffect } from "react";

export default function LocationForm({ onAdd, editingLocation }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [info, setInfo] = useState("");

  // Si en el futuro editas
  useEffect(() => {
    if (editingLocation) {
      setName(editingLocation.name || "");
      setAddress(editingLocation.address || "");
      setInfo(editingLocation.info || "");
    }
  }, [editingLocation]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🔥 Enviando ubicación desde LocationForm");

    if (!name.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    await onAdd({
      name,
      address,
      info,
    });

    // limpiar formulario
    setName("");
    setAddress("");
    setInfo("");
  };

  return (
    <section>
      <h2>Agregar nueva ubicación</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del punto (ej: Tienda Don Luis)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Dirección (ej: Carrera 50 #20-30, Bogotá)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <textarea
          placeholder="Información (opcional)"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />

        <button type="submit">
          Agregar ubicación
        </button>
      </form>
    </section>
  );
}
