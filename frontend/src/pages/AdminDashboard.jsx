import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "30px" }}>
      <h1>Panel Admin</h1>
      <p>Esta sección solo es visible para administradores.</p>

      <button
        onClick={() => navigate("/home")}
        style={{ marginTop: "20px" }}
      >
        Salir del Admin
      </button>
    </div>
  );
}
