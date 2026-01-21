// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header>
      <nav style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>Trayecta</strong>

        <div>
          <Link to="/home">Home</Link>{" "}
          <Link to="/routes">Rutas</Link>{" "}
          <Link to="/my-routes">Mis rutas</Link>{" "}
          <Link to="/profile">Perfil</Link>
        </div>

        <button onClick={handleLogout}>
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}
