import { Container } from '@/shared/components/shared';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { FeaturedStores } from '@/shared/components/shared/featured-stores';
import { allStoresOptions } from '@/shared/hooks/stores';

export default function HomePage({ params }: { params: any }) {
  const queryClient = new QueryClient();

  void queryClient.prefetchQuery(allStoresOptions);
  console.log(params, 'params');

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container className={'grid grid-cols-5 gap-4 py-4'}>
        <FeaturedStores />
      </Container>
    </HydrationBoundary>
  );
}
