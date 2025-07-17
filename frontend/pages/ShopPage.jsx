import React from 'react';
import NavBar from '../components/NavBar';
import MainLeft from '../components/MainLeft';
import MainRight from '../components/MainRight';
import { useState, useEffect, } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlashMessage from '../components/FlashMessage';
import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const ShopPage = () => {

  const { fetchProducts } =useContext(ProductContext);

  const location = useLocation();
  const navigate = useNavigate();
  const [flashMessage, setFlashMessage] = useState(null);

  useEffect(() => {
    if (location.state?.message) {
      setFlashMessage(location.state.message);

      // 👇 Clear the state after using it
      // This replaces the current history entry without the message
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    fetchProducts();
}, []);

  return (
   <>
   <div className="relative">
    <FlashMessage message={flashMessage} />
    <div className="flex flex-col h-screen w-screen overflow-hidden">
       
        {/* Top Navbar */}
        <div className="h-[10vh] border-b border-black">
          <NavBar isShop/>
        </div>

        {/* Bottom: Left and Right Pane */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-[20%] overflow-hidden">
            <MainLeft showSort />
          </div>

          {/* Right Main Content */}
          <div className="w-[80%] overflow-hidden">
            <MainRight />
          </div>
        </div>
      </div>
  </div>
    </>
  );
 
};

export default ShopPage;
