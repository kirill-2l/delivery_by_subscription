import { Container } from '@/shared/components/shared/container';
import Link from 'next/link';
import { Logo } from '@/shared/components/shared/logo';
import { AppRoutes } from '@/shared/constants';

interface Props {}

export const Footer = (props: Props) => {
  return (
    <Container className='flex items-center justify-between py-6'>
      <Link href={AppRoutes.home}>
        <Logo />
      </Link>
    </Container>
  );
};
