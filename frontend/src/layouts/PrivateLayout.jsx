import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import appLayout from "../styles/layout/appLayout.module.css";

export default function PrivateLayout() {
  return (
    <div className={appLayout.app}>
      <header className={appLayout.header}>
        <Header />
      </header>

      <main className={appLayout.main}>
        <Outlet />
      </main>
    </div>
  );
}
