import { useStore } from '@/shared/hooks/stores';
import { StoreHeader } from '@/shared/components/shared/store-header';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getQueryClient } from '@/shared/services/react-query';
import { Api } from '@/shared/services/api-client';

interface StoreDetailPageProps {}

export default async function StoreDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // const { id } = params;
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ['products'],
  //   queryFn: () => Api.products.getAll(),
  //   initialData: [],
  // });

  // if (!store) return null;
  return (
    <div>
      {/*<HydrationBoundary state={dehydrate(queryClient)}>*/}
      {/*<StoreHeader name={store.name} />*/}
      {/*</HydrationBoundary>*/}
    </div>
  );
}
