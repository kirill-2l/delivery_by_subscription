'use server';

import { coreHttpClientInstance } from '../http-client';
import { Product } from '@/shared/services/products';

const OfferType = {
  freeDelivery: 'freeDelivery',
  discount: 'discount',
  mealAsGift: 'mealAsGift',
} as const;

export interface StoreProductCategory {
  id: number;
  name: string;
  items: Product[];
}

export interface StoreWithProductCategories
  extends Pick<Store, 'name' | 'id' | 'storeCoverImageSrc'> {
  categories: StoreProductCategory[];
}

export interface Store {
  id: number;
  name: string;
  // description?: string;
  // offerType?: typeof OfferType;
  // averageRating?: number;
  storeCoverImageSrc?: string;
}

const ENDPOINT = 'stores';

export const getAll = async () => {
  return (await coreHttpClientInstance.get<Store[]>(`${ENDPOINT}`)).json();
};

export const getOne = async (id: number) => {
  return (
    await coreHttpClientInstance.get<StoreWithProductCategories>(
      `${ENDPOINT}/${id}`
    )
  ).json();
};
