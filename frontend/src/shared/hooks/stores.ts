import { QueryClient, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { Api } from '@/shared/services/api-client';

import { queryOptions } from '@tanstack/react-query';

export const allStoresOptions = queryOptions({
  queryKey: ['stores'],
  queryFn: () => Api.stores.getAll(),
});

export const useStore = (id: number) => {
  return useQuery({
    queryKey: ['storeDetail'],
    queryFn: () => Api.stores.getOne(id),
  });
};
