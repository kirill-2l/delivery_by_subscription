import { useQuery } from '@tanstack/react-query';
import { Api } from '@/shared/services/api-client';

const useStores = () => {
  return useQuery({
    queryKey: ['stores'],
    queryFn: () => Api.stores.getAll(),
    placeholderData: [],
  });
};

export { useStores };
