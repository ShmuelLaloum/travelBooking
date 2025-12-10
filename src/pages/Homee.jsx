import { Link } from "react-router-dom";
import "../App.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1>ברוכים הבאים לאתר ההזמנות</h1>
      <p>בחרו חדר והתחילו את החופשה שלכם</p>

      <Link to="/rooms" className="btn-link">
        לצפייה בחדרים
      </Link>
    </div>
  );
}
