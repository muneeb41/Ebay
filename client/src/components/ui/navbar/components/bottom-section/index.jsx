import React from "react";
import { NavLink } from "react-router-dom";

const BottomSection = () => {
  return (
    <div className=" text-gray-800  w-full sm:flex justify-around items-center text-md py-2 shadow-md hidden md:px-32 lg:px-44">
      {/* Home */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `hover:text-blue-500 hover:scale-105 transition-all duration-300 ${
            isActive ? "text-blue-500 font-semibold border-b-2 border-blue-500" : ""
          }`
        }
      >
        Home
      </NavLink>


      {/* Fashion */}
      <NavLink
        to="/fashion"
        className={({ isActive }) =>
          `hover:text-blue-500 hover:scale-105 transition-all duration-300 ${
            isActive ? "text-blue-500 font-semibold border-b-2 border-blue-500" : ""
          }`
        }
      >
        Fashion
      </NavLink>

      {/* Household */}
      <NavLink
        to="/household"
        className={({ isActive }) =>
          `hover:text-blue-500 hover:scale-105 transition-all duration-300 ${
            isActive ? "text-blue-500 font-semibold border-b-2 border-blue-500" : ""
          }`
        }
      >
        Household
      </NavLink>

      {/* Electronics */}
      <NavLink
        to="/electronics"
        className={({ isActive }) =>
          `hover:text-blue-500 hover:scale-105 transition-all duration-300 ${
            isActive ? "text-blue-500 font-semibold border-b-2 border-blue-500" : ""
          }`
        }
      >
        Electronics
      </NavLink>

        {/* Explore */}
        <NavLink
        to="/explore"
        className={({ isActive }) =>
          `hover:text-blue-500 hover:scale-105 transition-all duration-300 ${
            isActive ? "text-blue-500 font-semibold border-b-2 border-blue-500 " : ""
          }`
        }
      >
        Explore
      </NavLink>
    </div>
  );
};

export default BottomSection;
