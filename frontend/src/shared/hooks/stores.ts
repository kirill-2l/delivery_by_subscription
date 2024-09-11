import { queryOptions, useQuery } from '@tanstack/react-query';
import { Api } from '@/shared/services/api-client';

export const allStoresOptions = queryOptions({
  queryKey: ['stores'],
  queryFn: Api.stores.getAll,
});

export const useStore = (id: number) => {
  return useQuery({
    queryKey: ['storeDetail'],
    queryFn: () => Api.stores.getOne(id),
  });
};
