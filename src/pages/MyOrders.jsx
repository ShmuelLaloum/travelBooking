import { useCart } from "../context/CartContext"; // <-- ייבוא הקונטקסט
import "../App.css";

export default function MyOrders() {
  const { orders } = useCart(); // <-- לוקחים את רשימת ההזמנות מה‑Context

  return (
    <div className="orders-container">
      <h1>ההזמנות שלי</h1>

      {orders.length === 0 ? (
        <p>אין הזמנות עדיין.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order, i) => (
            <li key={i} className="order-card">
              <h3>{order.room}</h3>
              <p><strong>שם המזמין:</strong> {order.name}</p>
              <p><strong>מתאריך:</strong> {order.from}</p>
              <p><strong>עד:</strong> {order.to}</p>
              <p><strong>אורחים:</strong> {order.guests}</p>
              <p><strong>סה״כ לילות:</strong> {order.nights}</p>
              <p><strong>סכום לתשלום:</strong> ${order.totalPrice}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
