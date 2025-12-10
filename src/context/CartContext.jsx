import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setOrders(saved);
  }, []);

  function addToCart(order) {
    const updated = [...orders, order];
    setOrders(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  }

  return (
    <CartContext.Provider value={{ orders, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
