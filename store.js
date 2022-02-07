import {configureStore} from '@reduxjs/toolkit';
import cartsSlice from './features/carts/cartSlice';
export const store = configureStore({
  reducer: {
    cart: cartsSlice,
  },
});
