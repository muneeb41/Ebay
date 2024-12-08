import React, { useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from '../../../../../libs/apiClient.js'
import { getUserFromLocalStorage, LOGOUT_ROUTES } from "../../../../../utils/constants.js";
import { toast } from "react-toastify";
import {logout} from '../../../../../redux/user/userSlice.js'
import { clearCart } from "../../../../../redux/cart/cartSlice.js";

const TopSection = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMyEbayDropdown, setShowMyEbayDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const navigate = useNavigate();
  const user = getUserFromLocalStorage();
  const carts = useSelector((store)=>store.cart.carts)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const response = await apiClient.post(LOGOUT_ROUTES);
      toast.success("Logout Successfully");
      dispatch(clearCart());
      dispatch(logout());
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 400 errors (Bad Request)
        const { message } = error.response.data;
        toast.warn(message);
      } else {
        // Handle other errors (e.g., network issues)
        toast.error("Something went wrong! Please try again.");
        console.error("Error during sign-up:", error);
      }
    }
  };

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleMyEbayMouseEnter = () => {
    setShowMyEbayDropdown(true);
  };

  const handleMyEbayMouseLeave = () => {
    setShowMyEbayDropdown(false);
  };

  const handleLoginMouseEnter = () => {
    setShowLoginDropdown(true);
  };

  const handleLoginMouseLeave = () => {
    setShowLoginDropdown(false);
  };

  return (
    <div className="hidden sm:flex justify-between items-center px-8 py-2 border-b text-sm ">
      {/* ========================================== LEFT SECTION ================================================= */}
      <div className="flex items-center gap-6">
        {/* Authentication */}
        {!user ? (
          <div className="relative" onMouseEnter={handleLoginMouseEnter} onClick={() => setShowLoginDropdown(!showLoginDropdown)}>
            <div className="hover:underline cursor-pointer hover:text-blue-500">Login/Sign up</div>
            {showLoginDropdown && (
              <div className="absolute top-10 left-0 w-40 bg-white shadow-lg rounded-lg p-4 z-10" onMouseLeave={handleLoginMouseLeave}>
                <ul>
                  <li className="hover:bg-gray-200 p-2 cursor-pointer flex items-center" onClick={() => navigate('/login')}>
                    <FaUserCircle className="mr-2" /> Login
                  </li>
                  <li className="hover:bg-gray-200 p-2 cursor-pointer flex items-center" onClick={() => navigate('/signup')}>
                    <FaUserCircle className="mr-2" /> Sign Up
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="relative" onMouseEnter={handleLoginMouseEnter} onClick={() => setShowLoginDropdown(!showLoginDropdown)}>
            <div className="hover:underline cursor-pointer hover:text-blue-500 flex items-center">
              <FaUserCircle className="mr-2 text-xl" /> Hi, {user.name} <MdOutlineKeyboardArrowDown className="text-lg" />
            </div>
            {showLoginDropdown && (
              <div className="absolute top-10 left-0 w-64 bg-white shadow-lg rounded-lg p-4 z-10" onMouseLeave={handleLoginMouseLeave}>
                <div className="flex justify-start ml-3 items-center space-x-2">
                <FaUserCircle className="mr-2 text-3xl " />
                <p className="text-center text-lg text-gray-600">{user.name}</p>
                </div>
                <ul>
                  <li className="hover:bg-gray-200 p-2 cursor-pointer" onClick={handleLogout}>
                    Sign out
                  </li>
                  <li className="hover:bg-gray-200 p-2 cursor-pointer" >
                    Account settings
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
        {/* Daily Deals */}
        <div className="hover:underline cursor-pointer">Daily Deals</div>
        {/* Help & Contact */}
        <div className="hover:underline cursor-pointer hidden md:flex">Help & Contact</div>
      </div>

      {/* ========================================== RIGHT SECTION ================================================= */}
      <div className="flex items-center gap-6">
        {/* Ship to */}
        <div className="hover:underline cursor-pointer">Ship to</div>
        {/* Sell */}
        <div className="hover:underline cursor-pointer">Sell</div>
        {/* My eBay */}
        <div className="relative" onMouseEnter={handleMyEbayMouseEnter} onClick={() => setShowMyEbayDropdown(!showMyEbayDropdown)}>
          <div className="hover:underline cursor-pointer flex items-center">
            My eBay <MdOutlineKeyboardArrowDown className="text-lg" />
          </div>
          {/* My eBay Dropdown */}
          {showMyEbayDropdown && (
            <div className="absolute top-10 right-0 w-64 bg-white shadow-lg rounded-lg p-4 z-10" onMouseLeave={handleMyEbayMouseLeave}>
              <ul>
                <li className="hover:bg-gray-200 p-2 cursor-pointer">Summary</li>
                <li className="hover:bg-gray-200 p-2 cursor-pointer">Recently Viewed</li>
                <li className="hover:bg-gray-200 p-2 cursor-pointer">Bids/Offers</li>
                <li className="hover:bg-gray-200 p-2 cursor-pointer">Watchlist</li>
                <li className="hover:bg-gray-200 p-2 cursor-pointer">Purchase History</li>
                <li className="hover:bg-gray-200 p-2 cursor-pointer">Buy Again</li>
                <li className="hover:bg-gray-200 p-2 cursor-pointer">Selling</li>
                <li className="hover:bg-gray-200 p-2 cursor-pointer">Saved Searches</li>
                <li className="hover:bg-gray-200 p-2 cursor-pointer">Saved Sellers</li>
                <li className="hover:bg-gray-200 p-2 cursor-pointer">Messages</li>
              </ul>
            </div>
          )}
        </div>
        {/* Notification Icon */}
        <div className="relative">
          <FaBell className="text-lg cursor-pointer" onClick={handleBellClick} onMouseEnter={handleBellClick} aria-label="Notifications" />
          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute top-10 right-0 w-64 bg-white shadow-lg rounded-lg p-4 z-10" onMouseLeave={() => setShowNotifications(false)}>
              <p className="text-center text-lg text-gray-600">There are no new notifications.</p>
            </div>
          )}
        </div>
        {/* Cart Icon with Badge */}
        <div className="relative" onClick={()=>navigate('/cart')}>
          <MdOutlineShoppingCart className="text-2xl cursor-pointer" aria-label="Shopping Cart" />
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {user?(carts.length):('0')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
