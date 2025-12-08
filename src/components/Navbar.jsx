import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    function updateCart() {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(savedCart.length);
    }

    updateCart();
    window.addEventListener("storage", updateCart);

    return () => window.removeEventListener("storage", updateCart);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">
          <Link to="/">My Hotel</Link>
        </h2>
      </div>

      <div className="nav-right">
        <Link to="/">בית</Link>
        <Link to="/rooms">חדרים</Link>
        <Link to="/booking">הזמנה</Link>

        {/* כפתור העגלה */}
        <Link to="/my-orders" className="cart-icon-container">
          🛒
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}
