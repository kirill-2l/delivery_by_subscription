'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Toaster } from 'react-hot-toast';
import { FC, PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import { getQueryClient } from '@/shared/services/react-query';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = getQueryClient();

  return (
    <>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools />
        </QueryClientProvider>
      </SessionProvider>
      <Toaster />
    </>
  );
};
