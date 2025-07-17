// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoutes = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3000/check', { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(res.data.loggedIn);
        setAuthChecked(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setAuthChecked(true);
      });
  }, []);

  if (!authChecked) return <div>Loading...</div>;

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoutes;
