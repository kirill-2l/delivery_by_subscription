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

export const getAll = async () => {
  return (await axiosCoreInstance.get<Store[]>('/stores')).data;
};
