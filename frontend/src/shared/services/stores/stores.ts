'use server';

import { axiosCoreInstance } from '@/shared/services/axios';

export interface Store {
  id: number;
  name: string;
}

export const getAll = async () => {
  return (await axiosCoreInstance.get<Store[]>('/stores')).data;
};
