import { Container } from '@/shared/components/shared';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { FeaturedStores } from '@/shared/components/shared/featured-stores';
import { allStoresOptions } from '@/shared/hooks/stores';

export default async function HomePage({ params }: { params: any }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(allStoresOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container className={'grid grid-cols-5 gap-4 py-4'}>
        <FeaturedStores />
      </Container>
    </HydrationBoundary>
  );
}
