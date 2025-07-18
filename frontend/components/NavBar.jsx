import React from 'react'

const NavBar = ({isShop=false,isCart=false,isAdmin=false}) => {
  return (
   <>
        <div className='flex justify-between items-center px-5 py-3 '>
            <div className='text-3xl font-semibold tracking-tighter'>{(isShop && "Shop.")||(isCart && "Cart.")||(isAdmin && "Admin Panel.")}</div>
            <div className=' font-semibold flex justify-between items-center gap-7'>
                <div className='flex  gap-3'>
                    <a href="#">Home</a>
                    <a href="#">Product</a>
                </div>

                <div className='flex  gap-3'>
                    {!isCart && <a href="#">Cart</a>}
                    <a href="#">Account</a>
                </div>
            </div>
        </div>
   </>
  )
}

export default NavBar