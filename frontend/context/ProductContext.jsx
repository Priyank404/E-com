// context/ProductContext.jsx
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/shop');
      setProducts(res.data.products);
    } catch (err) {
      console.log('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts(); // Initial load
  }, []);

  return (
    <ProductContext.Provider value={{ products, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
