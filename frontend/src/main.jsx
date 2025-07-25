import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ProductProvider} from '../context/ProductContext.jsx'
import { CartProvider } from '../context/CartContext.jsx'
import { UserProvider } from '../context/UserContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <CartProvider>
        <UserProvider>
         <App />
        </UserProvider>
      </CartProvider>
    </ProductProvider>
  </StrictMode>,
)
