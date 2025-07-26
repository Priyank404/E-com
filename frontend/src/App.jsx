import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import ShopPage from '../pages/ShopPage';
import Cart from '../pages/Cart';
import AdminPanel from '../pages/AdminPanel';
import NewProductForm from '../pages/NewProductForm';
import ProtectedRoutes from '../components/ProtectedRoutes';

function App() {

  const {setUser} = useContext(UserContext);
  useEffect(() => {
    const fetchUser= async()=>{
      try {
        const res = await axios.get('http://localhost:3000/users/details',{ withCredentials: true });
        if(res.data.success){
          setUser({
            ...res.data.user,
            role: res.data.role
          });
        }
      } catch (error) {
      console.log(error)
      }
    }
    fetchUser();
  }, [])
  

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<HomePage />} />
        {/* Protected Routes */}
        <Route
          path="/shop"
          element={
            <ProtectedRoutes>
              <ShopPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/owner"
          element={
            <ProtectedRoutes>
              <AdminPanel />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/product/create"
          element={
            <ProtectedRoutes>
              <NewProductForm />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <ProfilePage />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
