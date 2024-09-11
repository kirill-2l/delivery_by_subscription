'use server';

import { coreHttpClientInstance } from '../http-client';

const OfferType = {
  freeDelivery: 'freeDelivery',
  discount: 'discount',
  mealAsGift: 'mealAsGift',
} as const;

export interface Store {
  id: number;
  name: string;
  description?: string;
  image?: string;
  imgHeight?: number;
  imgWidth?: number;
  offerType?: typeof OfferType;
  averageRating?: number;
}

const ENDPOINT = 'stores';

export const getAll = async () => {
  return (await coreHttpClientInstance.get<Store[]>(`${ENDPOINT}`)).json();
};

export const getOne = async (id: number) => {
  return (await coreHttpClientInstance.get<Store>(`${ENDPOINT}/${id}`)).json();
};
