import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, size } = action.payload;

      const existingItem = state.cart.find(
        (item) => item.id === id && item.size === size
      );

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.cart.push(action.payload);
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id != action.payload.id);
    },
    increment: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
      );
    },
    decrement: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload.id ? { ...item, qty: item.qty - 1 } : item
      );
    },

    clearCart : (state) => {
      state.cart = [];
    }
  },
});

export const { addToCart, removeFromCart, increment, decrement,clearCart } =
  CartSlice.actions;
export default CartSlice.reducer;
