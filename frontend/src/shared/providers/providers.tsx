import { Toaster } from 'react-hot-toast';
import { FC, PropsWithChildren } from 'react';
import { NextAuthProvider } from '@/shared/providers/next-auth.provider';
import StoreProvider from '@/shared/providers/store.provider';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NextAuthProvider>
        <StoreProvider>{children}</StoreProvider>
      </NextAuthProvider>
      <Toaster />
    </>
  );
};
