import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/users/register", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token); // ✅ Guardar JWT
      setMessage("Usuario registrado correctamente");
    } catch (err) {
      setMessage(err.response?.data?.error || "Error al registrar");
    }
  };

  return (
    <div>
      <h2>Registro de usuario</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
