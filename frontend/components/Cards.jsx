import {useEffect, useRef, useState, useContext} from 'react'
import './scroll.css';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../context/CartContext';




const Cards = ({size='default',isCart=false, isAdmin=false , product}) => {

    const {fetchCart} = useContext(CartContext);

    const navigate = useNavigate();

    const handleCart = async (id)=>{
        try {
            const res = await axios.post(`http://localhost:3000/products/cart/${id}`,null,  {
                withCredentials: true // required to send the cookie
              });
              await fetchCart();

              navigate('/cart');
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleDelete = async (id)=>{
        try {
            const res = await axios.delete(`http://localhost:3000/products/delete/${id}`,{
                withCredentials: true // required to send the cookie
            });

            navigate('/owner', { state: { message: 'Product deleted successfully!' } });
            
        } catch (error) {
            
        }
    }


    const [Quantity, setQuantity] = useState(0)

    const increase = (perv) => {
        setQuantity(prev => prev + 1)
    }
    const decrease = (prev) => {
        setQuantity(prev => prev > 0? prev - 1 : 0)
    }

    let cardSize = '';
    if(size === 'default'){
        cardSize='h-[40vh] w-[200px]'
    }else{
        cardSize='h-[50vh] w-[400px]'
    }

    // for scrolling vertically when user scrolls horizontally. You can use the following code as a starting point:

  return (
   <>
        <div className={`${cardSize} shadow-md rounded-md overflow-hidden flex flex-col `}>
                    {/* Product Image */}
            <div className={`flex-1 h-[75%] bg-blue-200 flex p-4 items-center justify-center`}>
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover overflow-hidden rounded-md  " />
            </div>

                {/* Panel below image */}
            {isCart && (
                <div className={`bg-${product.panelColor} px-3 flex flex-col gap-3 h-[25%] justify-center`}>
                    {/* Name and Quantity Control */}
                    <div className="flex items-center justify-between">
                        <span className={`text-lg font-medium text-${product.textColor}`}>{product.name}</span>
                        
                        <div className="flex items-center justify-between gap-1">
                            <button
                            className="w-6 h-6 rounded-full bg-white text-gray-800 flex items-center justify-center text-sm font-extrabold      "
                            onClick={decrease}
                            >−</button>

                            <div className="bg-white rounded-sm px-2 w-8 flex justify-center text-sm font-medium">{Quantity}</div>

                            <button
                            className="w-6 h-6 rounded-full bg-white text-gray-800 flex items-center justify-center text-sm font-extrabold      "
                            onClick={increase}
                            >+</button>
                        </div>
                    </div>

                    {/* Net Total */}
                    <div className="flex items-center justify-between  text-gray-700 text-md">
                    <span>Net Total</span>
                    <span className="font-semibold ">₹{product.price}</span>
                    </div>
                </div>
            )||(

            <div className="bg-blue-100 px-2 py-2 flex items-center justify-between gap-2">
                    {/* Name & Price vertically stacked */}
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800">{product.name}</span>
                    <span className="text-sm text-gray-600">₹{product.price}</span>
                </div>

                    {/* + Button */}
                {isAdmin && (
                    <button
                    onClick={() => handleDelete(product._id)}
                    className=" rounded-full w-6 h-6 flex items-center justify-center text-xl font-bold text-gray-700"
                    >
                        <FaMinus />                
                    </button>
                )||
                <button
                    onClick={()=>handleCart(product._id)}
                    className=" rounded-full w-6 h-6 flex items-center justify-center text-xl font-bold text-gray-700"
                    >
                        <FaPlus />                
                    </button>}
                
                    
                
            </div>          
            )}
        </div>  
   </>
  )
}

export default Cards