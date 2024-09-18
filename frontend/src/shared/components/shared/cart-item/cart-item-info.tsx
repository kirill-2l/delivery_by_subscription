import { Title } from '@/shared/components/ui';
import { cn } from '@/shared/utils';

interface CartItemInfoProps {
  name: string;
  className?: string;
}

export const CartItemInfo = ({ name, className }: CartItemInfoProps) => {
  return <span className={cn('font-bold', className)}>{name}</span>;
};
