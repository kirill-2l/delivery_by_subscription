import {
  Container,
  Footer,
  Header,
  StoreCategories,
} from '@/shared/components/shared';
import { ReactNode } from 'react';
import { Api } from '@/shared/services/api-client';
import { getProductCategoryLink } from '@/shared/utils';

export default async function HomeLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) {
  const { id } = params;
  const { categories } = await Api.stores.getOne(Number(id));
  const mappedCategories = categories.map((category) => ({
    name: category.name,
    id: category.id,
    link: `#${getProductCategoryLink(category)}`,
  }));
  return (
    <>
      <Header className='sticky top-0' />
      <Container className='mt-8 flex'>
        <aside className='mr-10 w-[10rem] shrink-0'>
          <StoreCategories categories={mappedCategories}></StoreCategories>
        </aside>
        <div className='grow-1'>{children}</div>
      </Container>
      <Footer />
    </>
  );
}
