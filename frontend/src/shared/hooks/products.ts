import { useQuery } from '@tanstack/react-query';
import { Api } from '@/shared/services/api-client';

const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => Api.products.getAll(),
    placeholderData: [],
  });
};

export { useProducts };
