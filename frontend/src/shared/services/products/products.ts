'use server';

import { coreHttpClientInstance } from '../http-client';
import { CurrencyNameType } from '@/shared/utils';

export interface Product {
  id: number;
  name: string;
  price: number;
  productImageSrc?: string;
  currencyName: CurrencyNameType;
  description?: string;
  productType: string;
}

export const getAll = async () => {
  return await coreHttpClientInstance.get<Product[]>('/products').json();
};
