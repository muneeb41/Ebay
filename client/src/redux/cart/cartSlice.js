import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserFromLocalStorage, getCartsFromLocalStorage, GET_CART_ROUTE } from '../../utils/constants';
import apiClient from '../../libs/apiClient';

// Async Thunk for getting carts
export const getAllCart = createAsyncThunk(
  'cart/getAllCart',
  async (_, { rejectWithValue }) => {
    const user = getUserFromLocalStorage();
    const carts = getCartsFromLocalStorage();

    
    
    if (user && !carts) {
      try {
        const response = await apiClient.get(GET_CART_ROUTE);
        if(response.data.carts.length>0 ){
          localStorage.setItem('cart', JSON.stringify(response.data.carts)); // Ensure carts are stored as a string
        }else{
          localStorage.setItem('cart', []); // Ensure carts are stored as a string
        }
        return response.data.carts; // Return the data to update the state
      } catch (error) {
        console.error('Error fetching carts:', error);
        return rejectWithValue(error.message || 'Error fetching carts');
      }
    }

    return carts || []; // Return carts from localStorage if they exist
  }
);

const initialState = {
  carts: getCartsFromLocalStorage() || [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItemIndex = state.carts.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        // Update the specific item
        state.carts[existingItemIndex] = {
          ...state.carts[existingItemIndex],
          quantity,
        };
      } else {
        // Add a new item to the cart
        state.carts.push(action.payload);
      }
      // Update localStorage with the new state
      localStorage.setItem('cart', JSON.stringify(state.carts));
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const updatedCart = state.carts.filter((item) => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      state.carts = updatedCart;
    },
    clearCart: (state) => {
      localStorage.removeItem('cart');
      state.carts = [];
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItemIndex = state.carts.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1 && quantity > 0) {
        state.carts[existingItemIndex] = {
          ...state.carts[existingItemIndex],
          quantity,
        };
      }
      localStorage.setItem('cart', JSON.stringify(state.carts));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCart.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload; // Update carts with the fetched data
        state.error = null;
      })
      .addCase(getAllCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch carts';
        state.carts= []
      });
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
