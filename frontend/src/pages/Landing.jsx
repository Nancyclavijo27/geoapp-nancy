// src/pages/Landing.jsx
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenido a GeoApp Nancy</h1>
      <p>Inicia sesión o regístrate para continuar</p>

      <div style={{ margin: "20px" }}>
        <Link to="/login">
          <button style={{ marginRight: "10px" }}>Login</button>
        </Link>
        <Link to="/register">
          <button>Registrarse</button>
        </Link>
      </div>
    </div>
  );
}
