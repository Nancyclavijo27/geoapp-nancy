import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Header() {
  const navigate = useNavigate();

  // 🔑 leer usuario desde localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header style={{ borderBottom: "1px solid #ddd", padding: "10px 20px" }}>
      <nav style={{ display: "flex", alignItems: "center" }}>
        {/* LOGO */}
        <strong style={{ marginRight: "30px" }}>
          Trayecta
        </strong>

        {/* MENÚ */}
        <div style={{ display: "flex", gap: "15px" }}>
          <Link to="/home">Home</Link>
          <Link to="/routes">Rutas</Link>
          <Link to="/my-routes">Mis rutas</Link>
          <Link to="/profile">Perfil</Link>

          {/* 🔧 SOLO ADMIN */}
          {isAdmin && (
            <Link
              to="/admin"
              style={{ color: "#c0392b", fontWeight: "bold" }}
            >
              🔧 Admin
            </Link>
          )}
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          style={{ marginLeft: "auto" }}
        >
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}
