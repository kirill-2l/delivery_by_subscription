import { coreHttpClientInstance } from '../http-client';
import { Cart } from '@/shared/services/cart/cart.types';

export const getCart = async () => {
  return await coreHttpClientInstance.get<Cart>('cart').json();
};

export const deleteSingleProduct = async (productId: number) => {
  return await coreHttpClientInstance
    .delete<Cart>(`cart/product/${productId}`)
    .json();
};

export const addProduct = async (productId: number) => {
  return await coreHttpClientInstance
    .post<Cart>(`cart/product/${productId}`)
    .json();
};
