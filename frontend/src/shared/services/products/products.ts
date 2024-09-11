'use server';

import { coreHttpClientInstance } from '../http-client';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export const getAll = async () => {
  return (await coreHttpClientInstance.get<Product[]>('/products')).data;
};
