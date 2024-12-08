import React, { useEffect } from 'react'
import Navbar from '../../components/ui/navbar'
import CartList from './components/cart-list';
import Summary from './components/summary';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/constants';


const CartPage = () => {
  const carts = useSelector((state) => state.cart.carts); // Access the cart state from Redux
  const user = getUserFromLocalStorage()
  const navigate = useNavigate()

 useEffect(()=>{
  if(!user){
    toast.warn("Please log in to access your cart.");
    navigate('/signup');
  }
 },[user])

  return (
    <div className=''>
      <Navbar />
      <div className='flex flex-col-reverse lg:flex-row md:justify-between bg-gray-50'>
        <CartList carts={carts} />
         <div className='lg:mr-6 lg:w-[37vw]  '>
           <Summary />
         </div>
      </div>
    </div>
  )
}

export default CartPage