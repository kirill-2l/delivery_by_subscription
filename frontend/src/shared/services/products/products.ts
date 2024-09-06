'use server';

import { axiosCoreInstance } from '@/shared/services/axios';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export const getAll = async () => {
  return (await axiosCoreInstance.get<Product[]>('/products')).data;
};
