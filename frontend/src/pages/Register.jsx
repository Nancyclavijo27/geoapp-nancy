import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3001/auth/register", { name, email, password });

      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrarse");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Registrarse</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} /><br /><br />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br /><br />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br /><br />
      <button type="submit">Registrarse</button>
    </form>
  );
}
