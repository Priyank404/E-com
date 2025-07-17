import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import MainLeft from '../components/MainLeft';
import ProductForm from '../components/ProductForm';
import FlashMessage from '../components/FlashMessage';
import {useLocation, useNavigate} from 'react-router-dom';

const NewProductForm = () => {
  
 

  return (
   

      <div className="flex flex-col h-screen w-screen overflow-hidden">
        {/* Top Navbar */}
        <div className="h-[10vh] border-b border-black">
          <NavBar isAdmin />
        </div>

        {/* Bottom: Left and Right Pane */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-[20%] overflow-hidden">
            <MainLeft isAdmin />
          </div>

          {/* Right Main Content */}
          <div className="w-[80%] p-7">
            <h1 className="text-2xl font-medium tracking-tighter">Create New Product</h1>
            <hr className="my-6 border-t border-gray-300 w-full" />

            {/* ✅ Pass setFlashMessage to the form */}
            <ProductForm  />
          </div>
        </div>
      </div>

  );
};

export default NewProductForm;
