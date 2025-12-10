import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import rooms from "../data/rooms.json";
import "../App.css";

// ======================= פונקציות עזר =======================

// חישוב מספר הלילות
function calculateNights(from, to) {
  const start = new Date(from);
  const end = new Date(to);
  return (end - start) / (1000 * 60 * 60 * 24);
}

// קבלת המחיר של חדר לפי ID (עכשיו price הוא מספר)
function getRoomPrice(roomId) {
  const room = rooms.find((r) => r.id === Number(roomId));
  if (!room) return 0;
  return room.price; // ⬅️ לא צריך replace
}

// ולידציה של הטופס
function validateForm(form) {
  const fromDate = new Date(form.from);
  const toDate = new Date(form.to);

  if (!form.room) return "אנא בחר חדר להזמנה";
  if (toDate <= fromDate) return "תאריך יציאה חייב להיות אחרי תאריך הגעה!";

  return "";
}

// יצירת אובייקט להזמנה
function createOrderObject(form) {
  const room = rooms.find((r) => r.id === Number(form.room));
  const nights = calculateNights(form.from, form.to);
  const pricePerNight = getRoomPrice(form.room);

  return {
    name: form.name,
    from: form.from,
    to: form.to,
    guests: form.guests,
    room: room.title,
    nights: nights,
    totalPrice: nights * pricePerNight,
  };
}

// ======================= קומפוננטת Booking =======================

export default function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  const params = new URLSearchParams(location.search);
  const selectedRoomId = params.get("room");

  const [form, setForm] = useState({
    name: "",
    from: "",
    to: "",
    guests: 1,
    room: selectedRoomId || "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
  const { name, value } = e.target;

  setForm({
    ...form,
    [name]: name === "guests" ? Number(value) : value,
  });
}


  function handleSubmit(e) {
    e.preventDefault();

    const errorMsg = validateForm(form);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setError("");

    const order = createOrderObject(form);

    toast.success("ההזמנה נשלחה בהצלחה!", {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
    });

    addToCart(order);

    setTimeout(() => navigate("/"), 2000);
  }

  return (
    <div className="booking-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>טופס הזמנה</h1>

        <label>בחר חדר:</label>
        <select name="room" value={form.room} onChange={handleChange}>
          <option value="">בחר חדר...</option>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>
              {r.title} – {r.price}$/night
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
