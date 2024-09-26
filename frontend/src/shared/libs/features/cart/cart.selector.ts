import { RootState } from '@/store';

export const getCartTotalItemsCount = (state: RootState) => {
  return state.cart.totalAmount;
};
export const getCartTotalAmount = (state: RootState) => {
  return state.cart.totalAmount;
};
