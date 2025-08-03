import React from 'react'
import NavBar from '../components/NavBar'
import Cards from '../components/Cards'
import { useLocation } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { CartContext } from '../context/CartContext'
import { UserContext } from '../context/UserContext'
import PaymentButton from '../components/PaymentButton'

const Cart = ({ isCart = false }) => {

  const { User } = useContext(UserContext);



  const calculateTotal = (product) => {
  if (!product) return 0;

  const price = product.price || 0;
  const discount = product.discountedPrice || 0;
  const platformFee = 0;
  const shippingFee = 0;

  const finalPrice = price - discount;

  return finalPrice + platformFee + shippingFee;
};


  const {fetchCart, cartItems} = useContext(CartContext);

  useEffect(() => {
    fetchCart();
  }, []);

  const product = cartItems[0];

  if (!product) return <div>No product found in cart.</div>;
  return (
    <>
      <div className='main h-screen w-screen'>
        {/* NavBar */}
        <div className="h-[10vh] border-b border-black">
          <NavBar isCart />
        </div>

        {/* Body */}
        <div className='subMain gap-10 h-[90vh] w-full flex-grow justify-evenly overflow-hidden p-10 flex flex-row flex-nowrap'>
          
          {/* Left Card */}
          <Cards size='large' isCart product={product} />

          {/* Right Side - Price Breakdown */}
          <div className='w-2/3 flex'>
            <div className='font-semibold w-full'>
              <span className='text-xl'>Price Breakdown</span>

              <div className='flex flex-wrap h-[70vh] w-full'>

                {/* Breakdown Rows */}
                <div className='text-black tracking-tighter text-center flex pl-5 pt-2 gap-2 w-full  flex-col'>

                  <div className='flex justify-between flex-row w-1/3'>
                    <span>Total MRP</span>
                    <span>₹{product.price}</span>
                  </div>

                  <div className='flex justify-between flex-row w-1/3'>
                    <span>Discount on MRP</span>
                    <span>₹{product.discountedPrice || 0}</span>
                  </div>

                  <div className='flex justify-between flex-row w-1/3'>
                    <span>Platform Fee</span>
                    <span>₹0</span>
                  </div>

                  <div className='flex justify-between flex-row w-1/3'>
                    <span>Shipping Fee</span>
                    <span>FREE</span>
                  </div>

                  {/* Horizontal Line */}
                  <hr className="my-6 border-t border-gray-300 w-full" />

                  {/* Total and Button */}
                  <div className='flex justify-between items-center w-1/3'>
                    <span className='text-lg font-medium'>Total Amount</span>
                    <span className='text-green-500 text-lg font-bold'>₹{calculateTotal(product)}</span>
                  </div>

                  <PaymentButton user={User} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Cart
