import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaRegHeart, FaCheck } from "react-icons/fa";
import { ADD_TO_CART_ROUTE, getUserFromLocalStorage, REMOVE_FROM_CART_ROUTE } from "../../../utils/constants.js";
import { addToCart ,removeFromCart } from "../../../redux/cart/cartSlice.js";
import StarRating from "./components/start-rating/index.jsx";
import { FaHeart } from "react-icons/fa6";
import apiClient from  '../../../libs/apiClient.js'


const Cart = ({product}) => {

  const carts = useSelector((store)=> store.cart.carts)

  const [isAddToCart,setIsAddToCart] =  useState(()=>{
       return carts.find((cart)=> cart.id === product.id)
  });

  
 
  const navigate = useNavigate();
  const user = getUserFromLocalStorage();
  const dispatch = useDispatch();

  const handleDetails = (e) => {
    e.preventDefault();
    navigate(`/product-details/${product.id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const payload = { ...product, quantity: 1 };
    if (!user) {
      toast.error("You need to login to add items to cart");
      navigate("/signup");
      return;
    }
    if(isAddToCart){
    try {
      setIsAddToCart(false);
      const response = await apiClient.delete(`${REMOVE_FROM_CART_ROUTE}/${product.id}`);
      dispatch(removeFromCart({id: product.id}));
      toast.success("Item removed from cart");
    } catch (error) {
      console.log(error);
      toast.error("server Error")
      setIsAddToCart(true);
    }finally{
      return;
    }  
    }else{
      try {
        setIsAddToCart(true);
        const response = await apiClient.post(ADD_TO_CART_ROUTE, payload);
      dispatch(addToCart(response.data.cart));
      toast.success("Item added to cart");
      } catch (error) {
        console.log(error);
        setIsAddToCart(true);
        toast.error("Oops! server errors!");
      }
    }
  
  };

  return (
    <div className="relative w-60 bg-white border rounded-lg shadow-lg overflow-hidden hover-scale" onClick={handleDetails}>
     

      {/* Product Image */}
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        {/* Add to Cart Icon */}
        <button
          onClick={handleAddToCart}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-200 hover-scale"
        >
            {isAddToCart? (
              <FaHeart className="text-2xl text-red-600" />
            ) : (
              <FaRegHeart className="text-2xl hover:text-blue-500" />
            )}
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-md font-semibold text-wrap text-gray-800">
          {product.title}
        </h3>

        <div className="flex justify-between gap-0">
          {/* Price and Discount */}
          <div className="flex items-center mt-2">
            <span className="text-xl font-bold text-green-600">
              ${product.price?.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="ml-2 text-md text-gray-500 line-through">
                ${(
                  product.price /
                  (1 - product.discountPercentage / 100)
                )?.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Rating */}
        <StarRating rating={product.rating} />
      </div>
    </div>
  );
};

export default Cart;
