// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return navigate("/login");

    axios
      .get("http://localhost:3001/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login"));
  }, );

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
              navigate("/login");
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
