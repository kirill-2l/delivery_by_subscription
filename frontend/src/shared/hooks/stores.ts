import { queryOptions } from '@tanstack/react-query';
import { Api } from '@/shared/services/api-client';

export const allStoresOptions = queryOptions({
  queryKey: ['stores'],
  queryFn: Api.stores.getAll,
});

export const storeOptions = (id: number) =>
  queryOptions({
    queryKey: ['storeDetail'],
    queryFn: () => Api.stores.getOne(id),
  });
