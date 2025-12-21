import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";


export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    api
      .get("/api/user/perfil")  // <--- SOLO ESTO
      .then((res) => {
        console.log("Perfil cargado:", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Error al cargar perfil:", err.response?.data);
        navigate("/login");
      });
  }, [navigate]); // <--- ARREGLADO

  return (
    <div style={{ margin: "50px auto", width: "350px" }}>
      <h2>Perfil de Usuario</h2>

      {user ? (
        <>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              logout();
              navigate("/login", { replace: true });
            }}
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}
