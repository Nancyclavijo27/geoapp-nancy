import MapView from "../components/MapView";

export default function Home() {
  return (
    <main>
      <section>
        <MapView />
      </section>

      <section>
        <p>📍 Distancia total: 565 km</p>
        <p>⏱ Tiempo total: 12.655 min</p>
      </section>
    </main>
  );
}
