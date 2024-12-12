import React, { useEffect, useState } from 'react';
import StarRating from '../start-rating/index.jsx';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { FaTruck, FaUndo } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../../../redux/cart/cartSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../../libs/apiClient.js';
import { REMOVE_FROM_CART_ROUTE, UPDATE_CART_ITEM_ROUTE } from '../../../../utils/constants.js';


const Cart = ({ cart }) => {
  const [quantity, setQuantity] = useState(cart.quantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [timerId , setTimerId]= useState()

  useEffect(() => {
    dispatch(updateQuantity({ id: cart.id, quantity }));
  }, [quantity]);

  const handleRemoveCart = async () => {
    try {
      const response = await apiClient.delete(`${REMOVE_FROM_CART_ROUTE}/${cart.id}`);
      console.log(response)
      dispatch(removeFromCart({ id: cart.id }));
     toast.success('Cart removed successfully');
    } catch (error) {
      console.log(error);
      toast.error("server Error")
    }
    
  };

  const handleDetails = () => {
    navigate(`/product-details/${cart.id}`);
  };

  const handleUpdate = (qty) => {
    setQuantity(qty);
    debouncedUpdateApi(qty); // Use the debounced version of the API call
  };
  
  const updateApiFunc = async (qty) => {
    try {
      const response = await apiClient.patch(`${UPDATE_CART_ITEM_ROUTE}/${cart.id}`, { quantity: qty });
      console.log(response);
    } catch (error) {
      console.error(error);
      setQuantity(quantity); // Revert quantity if API call fails
      toast.error("Server Error");
    }
  };
  
  const debouncing = (func, delay) => {  
    return function (...args) {
      clearTimeout(timerId);
      let timeout = setTimeout(() => func(...args), delay); // Use arguments for dynamic calls
      setTimerId(timeout);
    };
  };
  
  // Create a debounced version of updateApiFunc
  const debouncedUpdateApi = debouncing(updateApiFunc, 2000);

  return (
    <div className="relative flex flex-col sm:flex-row items-start p-4 sm:p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow space-y-4 sm:space-y-0 sm:space-x-6">
      {/* Remove Icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRemoveCart();
        }}
        className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 transition"
        title="Remove from cart"
      >
        <AiOutlineDelete size={24} />
      </button>

      {/* Product Image */}
      <div className="w-full sm:w-1/3 flex justify-center">
        <img
          src={cart.thumbnail}
          alt={cart.title}
          className="w-full h-auto max-w-[200px] sm:max-w-full object-contain rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow space-y-4 w-full">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{cart.title}</h2>

        {/* Price and Discount */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <span className="text-lg sm:text-xl font-semibold text-red-600">
            ${Number(cart.price).toFixed(2)}
          </span>
          {cart.discountPercentage > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 line-through">
                ${(cart.price / (1 - cart.discountPercentage / 100)).toFixed(2)}
              </span>
              <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                {cart.discountPercentage.toFixed(1)}% OFF
              </span>
            </div>
          )}
        </div>

        {/* Star Rating */}
        <StarRating rating={cart.rating} />

        {/* Quantity Control */}
        <div className="flex items-center space-x-4">
          <label className="hidden sm:block text-gray-700 font-medium">Qty:</label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity((prev) =>{
                let qty =  Math.max(1, prev - 1);
                handleUpdate(qty);
                return qty;
              })}
              className="p-2 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white transition"
            >
              <AiOutlineMinus size={16} />
            </button>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => handleUpdate(Number(e.target.value))}
              className="w-12 sm:w-16 text-center py-1 border rounded-md"
            />
            <button
              onClick={() => handleUpdate(quantity+1)}
              className="p-2 rounded-full bg-gray-200 hover:bg-green-500 hover:text-white transition"
            >
              <AiOutlinePlus size={16} />
            </button>
          </div>
        </div>

       {/* Shipping and Return Info */}
  <div className="text-sm text-gray-600 space-y-4 border-t pt-4 mt-2">
    <div className="flex items-center space-x-2">
      <FaTruck className="text-purple-600" />
      <span>
        <span className="font-medium text-gray-700">Shipping:</span>{' '}
        {cart.shippingInformation || "Ships in 2 weeks"}
      </span>
    </div>
    <div className="flex items-center space-x-2">
      <FaUndo className="text-blue-500" />
      <span>
        <span className="font-medium text-gray-700">Returns:</span>{' '}
        {cart.returnPolicy || "No return policy"}
      </span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-yellow-500 font-medium">⏳</span>
      <span>
        <span className="font-medium text-gray-700">Warranty:</span>{' '}
        {cart.warrantyInformation || "3 months"}
      </span>
    </div>
  </div>

       {/* Total Price */}
  <div className="text-lg sm:text-xl font-semibold text-gray-800 border-t pt-4">
    Total:{' '}
    <span className="text-red-600">
      ${(quantity * cart.price).toFixed(2)}
    </span>
  </div>

      {/* Details Button */}
<div className="flex flex-wrap items-center gap-2">
  <button
    onClick={(e) => {
      e.stopPropagation();
      handleDetails();
    }}
    className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 ease-in-out w-full sm:w-auto"
  >
    View Details
  </button>
</div>

      </div>
    </div>
  );
};

export default Cart;
