import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from '../../libs/apiClient.js';
import { useDispatch } from 'react-redux';
import { signup } from '../../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/ui/loading/index.jsx';
import { SIGNUP_ROUTES } from '../../utils/constants';
import { FaArrowLeft, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';


const Signup = () => {
  /////////////////////////////////////////////////// STATE INITIALIZATION ///////////////////////////////////////////////
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateSignupData = (data) => {
    if (
      data.email === '' ||
      data.password === '' ||
      data.confirmPassword === '' ||
      data.name === ''
    ) {
      toast.error('All fields are required');
      return false;
    }
    if (data.password.length < 4) {
      toast.error('Password must be at least 4 characters long');
      return false;
    }
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  /////////////////////////////////////////////////// FORM SUBMIT ///////////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateSignupData(formData)) return;

    try {
      setLoading(true);
      const { email, password, name } = formData;
      const response = await apiClient.post(SIGNUP_ROUTES, { email, password, name });
      
      toast.success('Signup successful');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      dispatch(signup(response.data.user));
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { message } = error.response.data;
        toast.warn(message);
      } else {
        toast.error('Something went wrong! Please try again.');
        console.error('Error during sign-up:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  /////////////////////////////////////////////////// LOADING COMPONENT ///////////////////////////////////////////////
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Loading />
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 transition-all bg-gradient-to-br from-gray-100 via-blue-100 to-purple-100">
      {/* Back to Home Button */}
      <div className="absolute top-6 left-8">
        <Link to="/" className="text-gray-700 hover:text-blue-500 flex items-center gap-2">
          <FaArrowLeft className="text-xl" />
          <span className="font-semibold text-lg">Back to Home</span>
        </Link>
      </div>
      {/* Signup Form */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg backdrop-blur-lg shadow-xl bg-opacity-80 mt-52 sm:mt-10 animate-slide-from-down">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="relative">
            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Confirm Password Field */}
          <div className="relative">
            <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-bold"
          >
            Sign Up
          </button>
          <div className="flex items-center justify-center gap-1 mt-4">
            <p className="text-center">Already have an account?</p>
            <Link
              to="/login"
              className="text-blue-500 font-semibold hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
