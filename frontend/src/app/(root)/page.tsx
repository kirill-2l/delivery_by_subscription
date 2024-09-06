'use client';

import { Container } from '@/shared/components/shared';
import { ProductCard } from '@/shared/components/shared/product-card';
import { useStores } from '@/shared/hooks/stores';

export default function HomePage() {
  const { data: stores, isLoading } = useStores();
  return (
    <Container className={'grid grid-cols-3 gap-4 py-4'}>
      {stores?.map((stores) => (
        <ProductCard key={stores.id} title={stores.name}></ProductCard>
      ))}
    </Container>
  );
}
