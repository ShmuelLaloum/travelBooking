import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import { addToCart } from "./MyOrders";
import rooms from "../data/rooms.json";
import "../App.css";

export default function Booking() {
  const navigate = useNavigate();
  const location = useLocation();

  // קריאת חדר מ־URL
  const params = new URLSearchParams(location.search);
  const selectedRoomId = params.get("room");

  const [form, setForm] = useState({
    name: "",
    from: "",
    to: "",
    guests: 1,
    room: selectedRoomId || "",  // החדר ייכנס אוטומטית
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const from = new Date(form.from);
    const to = new Date(form.to);

    if (to <= from) {
      setError("תאריך יציאה חייב להיות אחרי תאריך הגעה!");
      return;
    }

    if (!form.room) {
      setError("אנא בחר חדר להזמנה");
      return;
    }

    setError("");

    const roomData = rooms.find(r => r.id === Number(form.room));
    const nights = (to - from) / (1000 * 60 * 60 * 24);

    toast.success("ההזמנה נשלחה בהצלחה!", {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
    });

    // שמירה לעגלה
    addToCart({
      name: form.name,
      from: form.from,
      to: form.to,
      guests: form.guests,
      room: roomData.title,
      nights: nights,
      totalPrice: nights * Number(roomData.price.replace("$/night", "")),
    });

    setTimeout(() => navigate("/"), 2000);
  }

  return (
    <div className="booking-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>טופס הזמנה</h1>

        <label>בחר חדר:</label>
        <select name="room" value={form.room} onChange={handleChange}>
          <option value="">בחר חדר...</option>
          {rooms.map(r => (
            <option key={r.id} value={r.id}>
              {r.title} – {r.price}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="שם מלא"
          onChange={handleChange}
          required
        />

        <label>תאריך הגעה:</label>
        <input type="date" name="from" onChange={handleChange} required />

        <label>תאריך יציאה:</label>
        <input type="date" name="to" onChange={handleChange} required />

        <label>מספר אורחים:</label>
        <input type="number" name="guests" min="1" onChange={handleChange} />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn">
          שלח
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
