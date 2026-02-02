import MapView from "../components/MapView";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.dashboard}>
        {/* MAPA */}
        <div className={styles.mapWrapper}>
          <MapView />
        </div>

        {/* PANEL */}
        <aside className={styles.panel}>
          <div className={styles.card}>
            <h4>📍 Distancia total</h4>
            <p>565 km</p>
          </div>

          <div className={styles.card}>
            <h4>⏱ Tiempo total</h4>
            <p>12.655 min</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
