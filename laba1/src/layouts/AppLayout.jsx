import { NavLink, Outlet } from "react-router";
import "../App.css";

export default function AppLayout() {
  return (
    <div className="app">
      <header className="app-header">
        <nav className="app-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/traffic-light">Traffic Light</NavLink>
          <NavLink to="/stats">Stats</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}