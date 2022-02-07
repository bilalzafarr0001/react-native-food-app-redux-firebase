import {createSlice} from '@reduxjs/toolkit';

let nextCartId = 0;
let nextFavoriteId = 0;

const cartsSlice = createSlice({
  name: 'carts',
  initialState: {
    carts: [],
    favorites: [],
  },
  reducers: {
    addToCart(state, action) {
      let tempProductItem = {...action.payload, id: nextCartId++};
      state.carts.push(tempProductItem);
      // state.carts.push({id: nextCartId++, item: action.payload});
      console.log('State', state.carts);
    },
    addToFavorite(state, action) {
      state.favorites.push({id: nextFavoriteId++, item: action.payload});
    },
  },
});

export const {addToCart, addToFavorite} = cartsSlice.actions;

export default cartsSlice.reducer;
