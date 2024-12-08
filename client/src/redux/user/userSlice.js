import { createSlice } from '@reduxjs/toolkit';
import { getUserFromLocalStorage } from '../../utils/constants';


// Get initial state from local storage
const initialState = getUserFromLocalStorage();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signup: (state,action) => {
        localStorage.setItem('user',JSON.stringify(action.payload))
        state = action.payload
    },
    login: (state, action) => {
        localStorage.setItem('user',JSON.stringify(action.payload));
        state = action.payload;
        
    },
    logout: (state) => {
        localStorage.setItem('user',JSON.stringify(null));
        localStorage.removeItem('cart');
        state = null;
    },
  },
});

// Export actions and reducer
export const { signup, login, logout  } = userSlice.actions;
export default userSlice.reducer;