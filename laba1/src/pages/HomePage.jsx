import { Link } from "react-router";

export default function HomePage() {
  return (
    <section>
      <h1>Traffic Lights SPA</h1>
      <p>
        Multi-route React application with shared traffic light state across
        pages.
      </p>
      <div>
        <Link to="/traffic-light">Open Traffic Light</Link>
        <Link to="/stats">View Stats</Link>
      </div>
    </section>
  );
}