'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from './container';
import Image from 'next/image';
import Link from 'next/link';

;
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '@/shared/components/ui';
import { AuthModal } from '@/shared/components/shared/modals';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl uppercase font-black">Delivery</h1>
            </div>
          </div>
        </Link>
        <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
        <Button onClick={() => setOpenAuthModal(true)}>Sign in</Button>
      </Container>
    </header>
  );
};
