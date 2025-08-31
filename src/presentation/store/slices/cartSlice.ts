import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../../domain/entities/Product';

const CART_SLICE = 'cart';

type CartState = {
  items: Array<{
    product: Product;
    quantity: number;
  }>;
};

const INITIAL_STATE: CartState = {
  items: [],
};

const CartSlice = createSlice({
  name: CART_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    addToCart: (
      state: CartState,
      action: PayloadAction<{ product: Product; quantity: number }>,
    ) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        item => item.product.id === product.id,
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
    },
    removeFromCart: (state: CartState, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        item => item.product.id !== action.payload,
      );
    },
    clearCart: (state: CartState) => {
      state.items = [];
    },
  },
});

export default CartSlice.reducer;

export const { addToCart, removeFromCart, clearCart } = CartSlice.actions;
