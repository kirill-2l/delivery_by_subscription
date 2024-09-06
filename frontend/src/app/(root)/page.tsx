'use client';

import { Container } from '@/shared/components/shared';
import { ProductCard } from '@/shared/components/shared/product-card';
import { useProducts } from '@/shared/hooks';

export default function HomePage() {
  const { data: products, isLoading } = useProducts();
  return (
    <Container className={'grid grid-cols-3 gap-4 py-4'}>
      {products?.map((product) => (
        <ProductCard key={product.id} title={product.name}></ProductCard>
      ))}
    </Container>
  );
}
