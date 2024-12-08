import React, { useState } from "react";
import Cart from "../cart";
import { useNavigate } from "react-router-dom";

const CartList = ({ carts }) => {
    const [totalAmount , setTotalAmount] = useState([]);
    const navigate = useNavigate()
  return (
    <div className="  rounded-xl mx-6 my-4 lg:w-[60vw] ">
      <div className="py-6 bg-white rounded-2xl shadow-lg">
  <p className="text-3xl font-semibold text-gray-800 ml-10">🛒 Shopping Cart</p>
  <hr className="mx-5 my-4 border-t-2 border-gray-300" />
</div>

      {/* this is a container of a list of of cart items */}
      <div>
        { !carts?.length && <div className="flex flex-col justify-center bg-white mt-2 shadow-md py-7 rounded-xl items-center">
            <p className="text-center text-xl">Your cart is empty</p>
            <button onClick={()=> navigate('/')}
              className="mt-4 px-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Continue Shopping
            </button>
        </div>  }
        {carts?.map((cart, index) => {
          return (
            <div key={cart.id} className="bg-white my-2 rounded-2xl relative ">
              <Cart  cart={cart} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartList;
