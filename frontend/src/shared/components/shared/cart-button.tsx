import { CartDrawer } from '@/shared/components/shared/cart-drawer';
import { Button } from '@/shared/components/ui';
import { ShoppingCartIcon } from 'lucide-react';
import { getCartTotalAmount } from '@/shared/libs/features/cart/cart.selector';
import { useAppSelector } from '@/shared/libs/hooks';

interface Props {}

export const CartButton = (props: Props) => {
  const totalAmount = useAppSelector(getCartTotalAmount);
  return (
    <CartDrawer>
      {totalAmount && (
        <Button>
          <ShoppingCartIcon className='mr-1' />
          <span className='text-xs text-white'>{`${totalAmount}$`}</span>
        </Button>
      )}
    </CartDrawer>
  );
};
