import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import styles from "./UserProfile.module.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    api
      .get("/api/user/perfil")
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login"));
  }, [navigate]);

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h2>Perfil de Usuario</h2>

        {user ? (
          <>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <button
              className={styles.logout}
              onClick={() => {
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
    </main>
  );
}
