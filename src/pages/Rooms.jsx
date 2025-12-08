import rooms from "../data/rooms.json";
import { Link } from "react-router-dom";
import "../App.css";

export default function Rooms() {
  return (
    <div className="rooms-container">
      <h1>רשימת החדרים שלנו</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "nowrap" ,
          gap: "25px",
          overflowX: "auto"  ,
          paddingBottom: "20px",
        }}
      >
        {rooms.map((room) => (
          <div
            key={room.id}
            className="card"
            style={{ minWidth: "300px", flexShrink: 0 }}
          >
            <img src={room.picture} alt={room.title} />
            <h2>{room.title}</h2>
            <p>{room.price}</p>

            <Link to={`/rooms/${room.id}`}>
              <button className="btn">פרטים</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
