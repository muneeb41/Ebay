import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../libs/apiClient.js';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { FaArrowLeft } from 'react-icons/fa';
import { HiOutlineLogin } from 'react-icons/hi';
import Loading from '../../components/ui/loading/index.jsx';
import { LOGIN_ROUTES } from '../../utils/constants';
import { getAllCart } from '../../redux/cart/cartSlice.js';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateLoginData = (data) => {
    if (data.email === '' || data.password === '') {
      toast.error('All fields are required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateLoginData(formData)) return;

    try {
      setLoading(true);
      const response = await apiClient.post(LOGIN_ROUTES, formData);
      dispatch(login(response.data.user));
      dispatch(getAllCart());
      toast.success('Login Successfully');
      setFormData({
        email: '',
        password: '',
      });
      navigate('/');
    } catch (error) {
      const message =
        error.response?.status === 400
          ? error.response.data.message
          : 'Something went wrong! Please try again.';
      toast.warn(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-purple-100">
        <Loading />
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-purple-100">
      <div className="absolute top-6 left-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all"
        >
          <FaArrowLeft className="text-xl" />
          <span className="font-medium text-lg">Back to Home</span>
        </Link>
      </div>

      <div className="w-full max-w-lg bg-white bg-opacity-80 backdrop-blur-lg shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome Back!
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Login to continue
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FiMail className="text-gray-400 text-xl" />
              </span>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FiLock className="text-gray-400 text-xl" />
              </span>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-500 text-white rounded-lg shadow-lg font-medium hover:bg-blue-600 transition-all"
            >
              <HiOutlineLogin className="text-xl" />
              Login
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center gap-2 mt-6">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <Link
            to="/signup"
            className="text-blue-500 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
