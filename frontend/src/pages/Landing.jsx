import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import Button from "../components/ui/Button";

export default function Landing() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.title}>Trayecta</h1>

        <p className={styles.text}>
          Seguimiento de rutas en tiempo real,
          <br />
          simple y confiable.
        </p>

        <p className={styles.text}>
          Ideal para logística, monitoreo
          <br />
          y control de recorridos.
        </p>

        <div className={styles.buttons}>
          <Link to="/login">
            <Button>Iniciar sesión</Button>
          </Link>

          <Link to="/register">
            <Button variant="secondary">Registrarse</Button>
          </Link>
        </div>
      </section>

      <footer className={styles.footer}>
        © 2026 – Desarrollado por Nancy Clavijo
      </footer>
    </main>
  );
}
