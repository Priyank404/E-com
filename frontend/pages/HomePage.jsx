import React from 'react';
import { Field, Formik, Form } from 'formik';
import AuthFrom from '../components/AuthFrom';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

   useEffect(() => {
    axios.get('http://localhost:3000/check', { withCredentials: true })
      .then(res => {
        if (res.data.loggedIn) {
          // Let UI render first, then redirect
          setTimeout(() => {
            navigate('/shop');
          }, 200); // slight delay gives time for UI to render
        }
      });
  }, []);

  return (
    <div className="min-h-screen flex">
      
      {/* Left Side - Register */}
      <div className="w-[40%] bg-gray-200 flex items-center justify-start pl-12 ml-15">
        <div className="w-full max-w-md">
          <h1 className="text-4xl  mb-2">
            Welcome to <span className="text-yellow-500 font-bold">Jabsy</span>
          </h1>
          <h2 className="text-lg font-medium mb-6">create your account</h2>
          <AuthFrom  type={'Register'}  />
        </div>
      </div>

      {/* OR Circle */}
      <div className="w-[10%] flex items-center justify-center">
        <div className="bg-blue-500 text-white font-semibold 
          w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 
          rounded-full flex items-center justify-center 
          text-xs sm:text-sm md:text-base leading-none">
          or
        </div>
      </div>

      {/* Right Side - Login */}
      <div className="w-[45%] bg-white flex items-center justify-start pl-10">
        <div className="w-full max-w-md">
          <h2 className="text-xl font-medium mb-6">Login your account</h2>
          <AuthFrom type={'Login'} />
        </div>
      </div>

    </div>
  );
};

export default HomePage;
