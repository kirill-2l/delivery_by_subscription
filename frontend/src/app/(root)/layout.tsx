import { Footer, Header } from '@/shared/components/shared';
import { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header className='sticky top-0' />
      <main className={'flex-1 overflow-y-scroll'}>
        {children}
        <Footer />
      </main>
    </>
  );
}
