import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({isShop=false,isCart=false,isAdmin=false , isProfile=false}) => {
  return (
   <>
        <div className='flex justify-between items-center px-5 py-3 '>
            <div className='text-3xl font-semibold tracking-tighter'>{(isShop && "Shop.")||(isCart && "Cart.")||(isAdmin && "Admin Panel.")||(isProfile && "Profile.")}</div>
            <div className=' font-semibold flex justify-between items-center gap-7'>
                <div className='flex  gap-3'>
                    <Link to='/shop'>Home</Link>
                    <Link to='/profile'>Profile</Link>
                </div>

                <div className='flex  gap-3'>
                    {!isCart && <a href="#">Cart</a>}
                    {!isProfile && <a href="#">Account</a>}
                </div>
            </div>
        </div>
   </>
  )
}

export default NavBar