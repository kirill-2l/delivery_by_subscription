'use server';

import { axiosCoreInstance } from '@/shared/services/axios';

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
  return (await axiosCoreInstance.get<Store[]>(`${ENDPOINT}`)).data;
};

export const getOne = async (id: number) => {
  return (await axiosCoreInstance.get<Store>(`${ENDPOINT}/${id}`)).data;
};
