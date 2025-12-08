import { useEffect, useState } from "react";

export function addToCart(order) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(order);
  localStorage.setItem("cart", JSON.stringify(cart));

  window.dispatchEvent(new Event("storage"));
}

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setOrders(saved);
  }, []);

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
