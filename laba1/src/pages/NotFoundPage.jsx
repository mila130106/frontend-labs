import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section>
      <h1>404 — Page Not Found</h1>
      <p>The requested route does not exist.</p>
      <Link to="/">Back to Home</Link>
    </section>
  );
}