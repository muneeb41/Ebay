import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";
import logo from "../../../../../assets/images/logo/logo2.png";
import { allCategories } from "../../../../../utils/staticData.js";
import apiStore from "../../../../../libs/apiStore.js";
import { toast } from "react-toastify";


const MiddleSection = ({setSearchResults , loading , setLoading}) => {
  const [showCategories, setShowCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    try {
      setLoading(true); // Show loading state before fetching data
      const response = await apiStore.get(`/products/category/${selectedValue}`);
      setSearchResults(response.data.products); // Update search results with fetched products
      
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false); // Hide loading state after fetching data or error
    }
  };

    const fetchProducts = async () => {
      try {
        setLoading(true); // Show loading state before fetching data
        const response = await apiStore.get(`/products/search?q=${searchQuery}`);
        if(response.data.products.length == 0){
          toast.warn('No products found');
          setSearchResults([]); // Reset search results if no products found
          return;
        }  
        setSearchResults(response.data.products); // Update search results with fetched products
        
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false); // Hide loading state after fetching data or error
      }
    };
  
 

  return (
    <div className="sm:flex items-center justify-center px-2 py-4 relative hidden border-b-2 border-gray-200 ">
      {/* Logo */}
      <div className="pl-4 pr-2">
        <img src={logo} alt="Logo" className="h-14 w-32" />
      </div>

      {/* Shop by Categories */}
      <div
        className="relative md:flex items-center cursor-pointer group hidden "
        onMouseEnter={() => setShowCategories(true)}
        onClick={()=> setShowCategories(!showCategories)}
        
      >
        <div className="text-sm text-gray-700 pr-2">Shop by Categories <span className="inline-block"><RiArrowDropDownLine className="text-3xl inline-block" /></span></div>
        
        {/* Dropdown Menu */}
        {showCategories && (
          <div onMouseLeave={() => setShowCategories(false)}
          className="absolute top-10 left-0 bg-white shadow-lg rounded-lg p-4 w-[500px] z-10">
            <div className="grid grid-cols-3 gap-4">
              {allCategories.map((category, index) => (
                <div key={index} className="text-gray-700 text-sm hover:text-blue-500">
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Container */}
      <div className="flex items-center h-11 w-full max-w-4xl mx-2 bg-white border-2 border-black rounded-full shadow-md">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for anything"
          className="flex-grow bg-transparent focus:outline-none px-4 text-sm text-gray-700"
          onChange={(e)=>setSearchQuery(e.target.value)}   
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchProducts(); // Trigger your event
            }
          }} 
        />

{/* All Categories Dropdown */}
<div className="relative w-64 hidden md:inline-block  ">
  {/* Dropdown container */}
  <div className="flex justify-end items-center  gap-1">
  <select
      className="w-fit h-full bg-white border border-gray-300 rounded-r-full pl-3 pr-2 py-2 text-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition duration-300"
      value={selectedCategory}
      onChange={handleChange}
    >
      <option className="font-bold text-gray-900" value="All Categories">
        All Categories
      </option>
      {allCategories.map((category, index) => (
        <option
          key={index}
          value={category.name}
          className="hover:bg-blue-500"
        >
          {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
        </option>
      ))}
    </select>
  
  </div>

  {/* Custom scrollbar styles */}
  <style>
    {`
      select {
        scrollbar-width: thin;
        scrollbar-color: #9ca3af #f3f4f6;
      }
      select::-webkit-scrollbar {
        width: 6px;
      }
      select::-webkit-scrollbar-thumb {
        background-color: #9ca3af;
        border-radius: 9999px;
      }
      select::-webkit-scrollbar-thumb:hover {
        background-color: #6b7280;
      }
      select::-webkit-scrollbar-track {
        background-color: #f3f4f6;
      }
    `}
  </style>
</div>

      </div>

      {/* Search Button */}
      <button
  onClick={fetchProducts}
  type="submit"
  className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full px-6 py-2 text-sm font-medium mr-4 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
>
  <FiSearch className="mr-2" />
  Search
</button>
    </div>
  );
};

export default MiddleSection;
