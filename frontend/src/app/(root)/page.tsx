'use client';

import { Container } from '@/shared/components/shared';
import { useStores } from '@/shared/hooks/stores';
import { StoreCard } from '@/shared/components/shared/store-card';
import Link from 'next/link';
import { getRouteProductDetail } from '@/shared/constants';

export default function HomePage() {
  const { data: stores } = useStores();
  return (
    <Container className={'grid grid-cols-5 gap-4 py-4'}>
      {stores?.map((store) => (
        <Link key={store.id} href={getRouteProductDetail(store.id)}>
          <StoreCard {...store} imgHeight={150}></StoreCard>
        </Link>
      ))}
    </Container>
  );
}
