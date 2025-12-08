import { useParams, Link } from "react-router-dom";
import rooms from "../data/rooms.json";
import "../App.css";

export default function RoomDetails() {
  const { id } = useParams();
  const room = rooms.find((r) => r.id === Number(id));

  if (!room) return <h2>חדר לא נמצא</h2>;

  return (
    <div className="roomdetails-container">
      <div className="roomdetails-info">
        <h1>{room.title}</h1>
        <p>{room.description}</p>
        <p>
          <strong>מחיר:</strong> {room.price}
        </p>

        <Link to={`/booking?room=${room.id}`}>
          <button className="btn" style={{ marginTop: "20px" }}>
            הזמן עכשיו
          </button>
        </Link>

        <Link to="/rooms" style={{ marginTop: "10px" }}>
          <button className="btn btn-secondary">⬅ חזרה</button>
        </Link>
      </div>

      <img src={room.picture} alt={room.title} className="room-img" />
    </div>
  );
}
