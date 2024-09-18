import { Title } from '@/shared/components/ui';
import { cn } from '@/shared/utils';

interface CartItemPriceProps {
  price: string;
  className?: string;
}

export const CartItemPrice = ({ price, className }: CartItemPriceProps) => {
  return <span className={cn('font-bold', className)}>{`${price} $`}</span>;
};
