import React from "react";
import { FaFacebook, FaTwitter, FaBlog } from "react-icons/fa"; // Social icons
import { AiOutlineShoppingCart, AiOutlineTool, AiOutlineTeam } from "react-icons/ai"; // Info icons
import { MdContactSupport } from "react-icons/md"; // Contact icon

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-gray-700">
        {/* Buy Section */}
        <div>
          <h4 className="font-bold text-base mb-4 flex items-center text-blue-600">
            <AiOutlineShoppingCart className="mr-2 text-blue-500" /> Buy
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-500">Registration</li>
            <li className="hover:text-blue-500">eBay Money Back Guarantee</li>
            <li className="hover:text-blue-500">Bidding & buying help</li>
            <li className="hover:text-blue-500">Stores</li>
          </ul>
        </div>

        {/* Sell Section */}
        <div>
          <h4 className="font-bold text-base mb-4 text-green-600">Sell</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-green-500">Start selling</li>
            <li className="hover:text-green-500">Learn to sell</li>
            <li className="hover:text-green-500">Affiliates</li>
          </ul>
        </div>

        {/* Tools & Apps Section */}
        <div>
          <h4 className="font-bold text-base mb-4 flex items-center text-yellow-600">
            <AiOutlineTool className="mr-2 text-yellow-500" /> Tools & Apps
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-500">Developers</li>
            <li className="hover:text-yellow-500">Security center</li>
            <li className="hover:text-yellow-500">Site map</li>
          </ul>
        </div>

        {/* Stay Connected Section */}
        <div>
          <h4 className="font-bold text-base mb-4 text-red-600">Stay Connected</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center hover:text-red-500">
              <FaBlog className="mr-2 text-red-500" /> eBay's Blogs
            </li>
            <li className="flex items-center hover:text-red-500">
              <FaFacebook className="mr-2 text-blue-700" /> Facebook
            </li>
            <li className="flex items-center hover:text-red-500">
              <FaTwitter className="mr-2 text-blue-400" /> Twitter
            </li>
          </ul>
        </div>

        {/* About eBay Section */}
        <div>
          <h4 className="font-bold text-base mb-4 text-red-600">About eBay</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-red-500">Company info</li>
            <li className="hover:text-red-500">News</li>
            <li className="hover:text-red-500">Investors</li>
            <li className="hover:text-red-500">Careers</li>
            <li className="hover:text-red-500">Government relations</li>
            <li className="hover:text-red-500">Advertise with us</li>
            <li className="hover:text-red-500">Policies</li>
          </ul>
        </div>

        {/* Help & Contact Section */}
        <div>
          <h4 className="font-bold text-base mb-4 flex items-center text-blue-600">
            <MdContactSupport className="mr-2 text-blue-500" /> Help & Contact
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-500">Seller Information Center</li>
            <li className="hover:text-blue-500">Contact us</li>
          </ul>
        </div>

        {/* Community Section */}
        <div>
          <h4 className="font-bold text-base mb-4 flex items-center text-green-600">
            <AiOutlineTeam className="mr-2 text-green-500" /> Community
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-green-500">Announcements</li>
            <li className="hover:text-green-500">Discussion boards</li>
            <li className="hover:text-green-500">eBay Giving Works</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-12 text-center text-xs text-gray-500">
        <p>
          Copyright © 1995-2024 eBay Inc. All Rights Reserved.{" "}
          <a href="#" className="underline hover:text-gray-700">
            Accessibility
          </a>
          ,{" "}
          <a href="#" className="underline hover:text-gray-700">
            User Agreement
          </a>
          ,{" "}
          <a href="#" className="underline hover:text-gray-700">
            Privacy
          </a>
          ,{" "}
          <a href="#" className="underline hover:text-gray-700">
            Cookies
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-gray-700">
            AdChoice
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
