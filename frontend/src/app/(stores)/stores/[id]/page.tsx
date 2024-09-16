import { StoreHeader } from '@/shared/components/shared/store-header';
import { Api } from '@/shared/services/api-client';
import { ProductsGroupList } from '@/shared/components/shared';
import { Revalidate } from 'next/dist/server/lib/revalidate';
import { VisuallyHidden } from '@radix-ui/themes';
import { getProductCategoryLink } from '@/shared/utils';

export const revalidate: Revalidate = 0;

export default async function StoreDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const store = await Api.stores.getOne(Number(id));

  return (
    <>
      <StoreHeader image={store.storeCoverImageSrc} name={store.name} />
      {store?.categories.map((category) => (
        <div key={category.id}>
          <VisuallyHidden>
            <div
              id={getProductCategoryLink(category)}
              className='scroll-mt-20'
            />
          </VisuallyHidden>
          <ProductsGroupList
            items={category.items}
            title={category.name}
            className='mb-6'
          />
        </div>
      ))}
    </>
  );
}
