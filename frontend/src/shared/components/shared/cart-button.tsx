import { CartDrawer } from '@/shared/components/shared/cart-drawer';
import { Button } from '@/shared/components/ui';
import { ShoppingCartIcon } from 'lucide-react';

interface Props {}

export const CartButton = (props: Props) => {
  return (
    <CartDrawer>
      <Button>
        <ShoppingCartIcon className='mr-1' />
        Cart
      </Button>
    </CartDrawer>
  );
};
