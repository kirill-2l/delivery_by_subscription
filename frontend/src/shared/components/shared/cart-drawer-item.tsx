import * as CartItem from './cart-item';
import { CartItemProps } from '@/shared/components/shared/cart-item/cart-item.types';

export interface CartDrawerItemProps extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CartDrawerItem = (props: CartDrawerItemProps) => {
  const { imageUrl, price, name, quantity } = props;
  return (
    <div className='flex gap-4'>
      <CartItem.Image className='flex-shrink-0' src={imageUrl} alt={name} />
      <div className='flex flex-grow justify-between'>
        <div className='flex flex-col'>
          <CartItem.Info name={name} />
          <CartItem.Price price={String(price)} />
        </div>
        <CartItem.Count onClick={() => {}} value={quantity} />
      </div>
    </div>
  );
};
