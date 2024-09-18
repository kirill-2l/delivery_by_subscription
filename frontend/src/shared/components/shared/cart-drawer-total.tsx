import { Separator } from '@/shared/components/ui';

interface CartDrawerTotalProps {
  itemsCount: number;
  itemsPrice: number;
  deliveryPrice: number;
  totalPrice: number;
}

export const CartDrawerTotal = (props: CartDrawerTotalProps) => {
  const { itemsCount, totalPrice, deliveryPrice, itemsPrice } = props;
  return (
    <div className='flex flex-col text-xs font-bold'>
      <Separator />
      <div className='flex justify-between py-4'>
        <span>{itemsCount} items</span>
        <span>{itemsPrice}$</span>
      </div>
      <Separator />
      <div className='flex justify-between py-4'>
        <span>delivery</span>
        <span>{deliveryPrice}</span>
      </div>
      <Separator />
      <div className='flex justify-between pt-4 text-base'>
        <span>Total</span>
        <span>{totalPrice}</span>
      </div>
    </div>
  );
};
