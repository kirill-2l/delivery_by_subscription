import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Toaster } from 'react-hot-toast';
import { FC, PropsWithChildren } from 'react';
import { NextAuthProvider } from '@/shared/providers/next-auth.provider';
import { ReactQueryProvider } from '@/shared/providers/react-query.provider';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NextAuthProvider>
        <ReactQueryProvider>
          {children}
          <ReactQueryDevtools />
        </ReactQueryProvider>
      </NextAuthProvider>
      <Toaster />
    </>
  );
};
