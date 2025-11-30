import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3001/auth/login", { email, password });

      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Email o contraseña incorrectos");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br /><br />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br /><br />
      <button type="submit">Ingresar</button>
    </form>
  );
}
