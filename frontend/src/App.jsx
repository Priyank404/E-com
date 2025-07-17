import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ShopPage from '../pages/ShopPage';
import Cart from '../pages/Cart';
import AdminPanel from '../pages/AdminPanel';
import NewProductForm from '../pages/NewProductForm';
import ProtectedRoutes from '../components/ProtectedRoutes';

function App() {
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
      </Routes>
    </Router>
  );
}

export default App;
