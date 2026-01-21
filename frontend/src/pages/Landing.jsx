// src/pages/Landing.jsx
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main>
      <section>
        <h1>Trayecta</h1>

        <p>
          Seguimiento de rutas en tiempo real,
          <br />
          simple y confiable.
        </p>

        <p>
          Ideal para logística, monitoreo
          <br />
          y control de recorridos.
        </p>

        <div>
          <Link to="/login">
            <button>Iniciar sesión</button>
          </Link>

          <Link to="/register">
            <button>Registrarse</button>
          </Link>
        </div>
      </section>

      <footer>
        © 2026 – Desarrollado por Nancy Clavijo
      </footer>
    </main>
  );
}
