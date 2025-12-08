import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>404 – הדף לא נמצא</h1>
      <Link to="/">חזרה לדף הבית</Link>
    </div>
  );
}
