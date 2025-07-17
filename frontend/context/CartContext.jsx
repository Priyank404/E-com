// context/CartContext.jsx
import { createContext, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:3000/products/cart', {
        withCredentials: true
      });
      setCartItems(res.data.cart);
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
