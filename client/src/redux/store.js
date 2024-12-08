import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js'; 
import cartReducer from './cart/cartSlice.js';

const store = configureStore({
  reducer: {
    user: userReducer, // this is user store that contain information about user Authentication
    cart: cartReducer, // this is cart store that contain information
  },
});

export default store;