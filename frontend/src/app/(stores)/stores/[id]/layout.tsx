import { Container, Footer, Header } from '@/shared/components/shared';
import { ReactNode } from 'react';
import { StoreCategories } from '@/shared/components/shared/store-categories';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <main className='min-h-screen'>
      <Header />
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
    </main>
  );
}
