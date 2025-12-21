import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ No autenticado
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ No es admin
  if (adminOnly && user.role?.toUpperCase() !== "ADMIN") {
    return <Navigate to="/home" replace />;
  }

  // ✅ Autorizado
  return children;
}
