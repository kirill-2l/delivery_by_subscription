'use client';

import Link from 'next/link';
import { StoreCard } from '@/shared/components/shared/store-card';
import { getStoreDetailRoute } from '@/shared/constants';
import { Store } from '@/shared/services/stores';

interface FeaturedStoresProps {
  stores: Store[];
}

export const FeaturedStores = ({ stores }: FeaturedStoresProps) => {
  return stores?.map((store) => (
    <Link key={store.id} href={getStoreDetailRoute(store.id)}>
      <StoreCard {...store} imgHeight={150}></StoreCard>
    </Link>
  ));
};
