'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { allStoresOptions } from '@/shared/hooks/stores';
import Link from 'next/link';
import { StoreCard } from '@/shared/components/shared/store-card';
import { getStoreDetailRoute } from '@/shared/constants';

export const FeaturedStores = () => {
  const { data: stores } = useSuspenseQuery(allStoresOptions);

  return stores?.map((store) => (
    <Link key={store.id} href={getStoreDetailRoute(store.id)}>
      <StoreCard {...store} imgHeight={150}></StoreCard>
    </Link>
  ));
};
