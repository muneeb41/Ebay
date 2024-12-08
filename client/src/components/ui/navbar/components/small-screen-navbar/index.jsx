import React, { useState } from 'react';
import logo from '../../../../../assets/images/logo/logo2.png';
import { FiSearch, FiUser, FiShoppingCart, FiMenu } from "react-icons/fi";
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getUserFromLocalStorage, LOGOUT_ROUTES } from '../../../../../utils/constants';
import apiClient from '../../../../../libs/apiClient.js';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../../../redux/user/userSlice';
import { NavLink } from 'react-router-dom';
import apiStore from '../../../../../libs/apiStore.js';
import { clearCart } from '../../../../../redux/cart/cartSlice.js';



const SmallScreenNavbar = ({setLoading , loading , setSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For toggling the menu
  const user = getUserFromLocalStorage();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

 const carts = useSelector((store)=>store.cart)
 

  const handleLoginMouseEnter = () => setShowLoginDropdown(true);
  const handleLoginMouseLeave = () => setShowLoginDropdown(false);

  const handleLogout = async () => {
    try {
      const response = await apiClient.post(LOGOUT_ROUTES);
      toast.success("Logout Successfully");
      dispatch(logout());
       dispatch(clearCart());
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

  const fetchProducts = async () => {
    console.log("Fetching products");
    try {
      setLoading(true); // Show loading state before fetching data
      const response = await apiStore.get(`/products/search?q=${searchQuery}`);
      if(response.data.products.length == 0){
        toast.warn('No products found');
        setSearchResults([]); // Reset search results if no products found
        return;
      }  
      console.log(response.data.products);
      setSearchResults(response.data.products); // Update search results with fetched products
      
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false); // Hide loading state after fetching data or error
    }
  };


  return (
    <div className='bg-white shadow-md sm:hidden'>
      <div className="px-4 py-2 flex items-center justify-between sm:px-6 md:px-10">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
        </div>

      

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* User Icon */}
          {user ? (
            <div className="relative">
              <div
                className="flex items-center cursor-pointer text-sm p-2 text-blue-500"
                onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                onMouseEnter={handleLoginMouseEnter}
                onMouseLeave={handleLoginMouseLeave}
              >
                <FaUserCircle className="mr-2 text-2xl" />
              </div>
              {showLoginDropdown && (
                <div className="absolute top-12 w-32 bg-white shadow-lg rounded-lg p-4 z-10">
                  <div className="flex justify-start ml-3 items-center space-x-2">
                    <FaUserCircle className="mr-2 text-2xl " />
                    <p className="text-center text-sm text-gray-600">{user.name}</p>
                  </div>
                  <ul>
                    <li
                      className="hover:bg-gray-200 p-2 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Sign out
                    </li>
                    <li className="hover:bg-gray-200 p-2 cursor-pointer">
                      Account settings
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <FiUser
              className="text-gray-600 cursor-pointer hover:text-gray-800"
              size={24}
              onClick={() => navigate('/signup')}
            />
          )}

          {/* Cart Icon */}
          <div className="relative" onClick={()=>{
            if(user){
              navigate(`/cart`)
            }else{
              navigate('/signup')
            }
          }}>
            <FiShoppingCart className="text-gray-600 cursor-pointer hover:text-gray-800" size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {user?(carts.length):('0')}
            </span>
          </div>

          {/* Menu Icon (visible on small screens) */}
          <FiMenu
            className="text-gray-600 cursor-pointer hover:text-gray-800 md:hidden"
            size={24}
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu visibility
          />
        </div>
      </div>

      {/* Dropdown Menu (Visible when hamburger menu is clicked) */}
      {isMenuOpen && (
        <div className="p-4 bg-white shadow-md space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block hover:text-blue-500 hover:scale-105 transition-all duration-300 ${isActive ? "text-blue-500 font-semibold " : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `block hover:text-blue-500 hover:scale-105 transition-all duration-300 ${isActive ? "text-blue-500 font-semibold " : ""}`
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/fashion"
            className={({ isActive }) =>
              `block hover:text-blue-500 hover:scale-105 transition-all duration-300 ${isActive ? "text-blue-500 font-semibold " : ""}`
            }
          >
            Fashion
          </NavLink>
          <NavLink
            to="/household"
            className={({ isActive }) =>
              `block hover:text-blue-500 hover:scale-105 transition-all duration-300 ${isActive ? "text-blue-500 font-semibold " : ""}`
            }
          >
            Household
          </NavLink>
          <NavLink
            to="/electronics"
            className={({ isActive }) =>
              `block hover:text-blue-500 hover:scale-105 transition-all duration-300 ${isActive ? "text-blue-500 font-semibold " : ""}`
            }
          >
            Electronics
          </NavLink>
        </div>
      )}

      {/* Search bar components */}
      <div className="w-full p-4 flex items-center justify-center">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchProducts(); // Trigger your event
              }
            }} 
            className="w-full py-2 px-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchProducts}
            className="absolute right-0 top-0 bottom-0 bg-blue-500 text-white py-2 px-4 hover:bg-blue-600"
          >
            <FiSearch size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmallScreenNavbar;
