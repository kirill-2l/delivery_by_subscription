import { Container, Footer, Header } from '@/shared/components/shared';
import { ReactNode } from 'react';
import { StoreCategories } from '@/shared/components/shared/store-categories';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header className='sticky top-0' />
      <Container className='flex'>
        <aside>
          <StoreCategories></StoreCategories>
        </aside>
        <div className='w-full shrink-0'>{children}</div>
        <aside>
          <StoreCategories></StoreCategories>
        </aside>
      </Container>
      <Footer />
    </>
  );
}
