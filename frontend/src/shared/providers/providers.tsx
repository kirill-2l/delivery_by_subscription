import { Toaster } from 'react-hot-toast';
import { FC, PropsWithChildren } from 'react';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};
