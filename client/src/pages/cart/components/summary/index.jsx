import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../../redux/cart/cartSlice.js";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import apiClient from "../../../../libs/apiClient.js";
import { CLEAR_CART_ROUTE } from "../../../../utils/constants.js";
import { REMOVE_FROM_CART_ROUTE } from "../../../../utils/constants.js";
import { RxCross2 } from "react-icons/rx";
import { removeFromCart } from "../../../../redux/cart/cartSlice.js";


const Summary = () => {
  const carts = useSelector((state) => state.cart.carts); // Access the cart state from Redux
  const totalAmount = carts.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  const dispatch = useDispatch(); // Access the dispatch function from Redux

  const handleCheckout = async () => {
    if (carts.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed.");
      return;
    }
    try {
      const response = await apiClient.delete(CLEAR_CART_ROUTE);
      dispatch(clearCart()); // Clear the cart before checkout
    toast.success("Order placed successfully. Thank you!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order. Please try again."); 
    }
    
  };

  const handleRemoveCart = async (id) => {
    try {
      const response = await apiClient.delete(`${REMOVE_FROM_CART_ROUTE}/${id}`);
      console.log(response)
      dispatch(removeFromCart({ id:id }));
     toast.success('Cart removed successfully');
    } catch (error) {
      console.log(error);
      toast.error("server Error")
    }
    
  };

  return (
    <div className="bg-white shadow-xl p-6 rounded-xl mx-6 my-4">
      <div className="text-center mb-6">
        <p className="text-3xl font-bold text-gray-800">Order Summary</p>
        <hr className="mt-4 border-gray-300" />
      </div>

      <div className="space-y-4">
        {carts.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          carts.map((cart, index) => (
            <div
              key={index}
              className="relative flex flex-col sm:flex-row items-center justify-between bg-blue-50 p-4 rounded-lg shadow-sm "
            >
              {/* Remove Icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRemoveCart(cart.id);
        }}
        className="absolute -top-2 -left-2 p-2 text-gray-400 hover:text-red-500 transition"
        title="Remove from cart"
      >
        <RxCross2 size={24} />
      </button>
              <div className="flex flex-col sm:flex-row items-center  sm:gap-4">
                <img
                  src={cart.thumbnail}
                  alt={cart.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className=" ">
                  <p className="font-semibold text-gray-800  ">{cart.title}</p>
                  <p className="text-sm text-gray-600">Quantity: {cart.quantity}</p>
                </div>
              </div> 
              <div className="text-center sm:text-right ">
                <p className="text-lg font-bold text-green-700">
                  ${(cart.price * cart.quantity).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 flex items-center justify-end lg:flex-col xl:flex-row">
                  <span className="text-xs text-gray-400 mr-1">Price per unit:</span>
                  <span className="text-red-500 font-semibold">
                    ${cart.price.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {carts.length > 0 && (
  <div className="mt-6 bg-gradient-to-r from-blue-50 via-gray-100 to-blue-50 p-4 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
    <p className="text-center text-lg md:text-xl lg:text-2xl font-bold text-gray-700 text-wrap flex flex-wrap justify-center">
      Total Amount:
      <span className="ml-2 text-green-400">
        ${totalAmount.toFixed(2)}
      </span>
    </p>
    <p className="text-center text-xs md:text-sm text-gray-500 mt-2">
      Ensure everything looks good before proceeding to checkout.
    </p>
  </div>
)}

      <div className="mt-6 text-center">
        <button
          onClick={handleCheckout}
          className="bg-gradient-to-r mx-auto from-indigo-500 to-blue-600 hover:from-blue-600 hover:to-indigo-500 text-white px-2 sm:px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          <FaShoppingCart className="text-xl hidden sm:flex" />
          <span className="text-sm" >Proceed to Checkout</span>
        </button>
      </div>
    </div>
  );
};

export default Summary;
