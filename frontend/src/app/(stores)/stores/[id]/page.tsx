import { StoreHeader } from '@/shared/components/shared/store-header';
import { Api } from '@/shared/services/api-client';
import { Container, ProductsGroupList } from '@/shared/components/shared';
import { Revalidate } from 'next/dist/server/lib/revalidate';

export const revalidate: Revalidate = 0;

export default async function StoreDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const store = await Api.stores.getOne(Number(id));

  return (
    <Container>
      <StoreHeader image={store.storeCoverImageSrc} name={store.name} />
      {store?.categories.map((category) => (
        <ProductsGroupList
          key={category.id}
          items={category.items}
          title={category.name}
          className='mb-6'
        />
      ))}
    </Container>
  );
}
