import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '@/shared/services/cart';

interface CartState extends Omit<Cart, 'id'> {
  isLoading: boolean;
  error: string | null;
  id?: number;
}

const initialState: CartState = {
  totalAmount: 0,
  items: [],
  isLoading: false,
  error: null,
};
const cartSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addProduct: (
      state,
      { payload: { items, totalAmount, id } }: PayloadAction<Cart>
    ) => {
      state.items = items;
      state.totalAmount = totalAmount;
      state.id = id;
    },
  },
});

export const { actions: cartActions, reducer: cartReducer } = cartSlice;
