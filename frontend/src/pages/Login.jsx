import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance"; // tu instancia de axios
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", { email, password });

      // Guardar token
      localStorage.setItem("token", data.token);

      // Guardar usuario con rol
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role?.toUpperCase() === "ADMIN") {
  navigate("/admin");
} else {
  navigate("/home");
}

    } catch (err) {
      setError(err.response?.data?.message || "Email o contraseña incorrectos");
    }
  };

 return (
  <main>
    <section>
      <h2>Iniciar sesión</h2>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Entrar</button>
      </form>

      <p>
        ¿No tienes cuenta?{" "}
        <Link to="/register">Regístrate</Link>
      </p>
    </section>
  </main>
);

}
