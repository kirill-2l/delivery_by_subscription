import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui';
import { VisuallyHidden } from '@radix-ui/themes';
import {
  CartDrawerItem,
  CartDrawerItemProps,
} from '@/shared/components/shared/cart-drawer-item';
import { CartDrawerTotal } from '@/shared/components/shared/cart-drawer-total';

interface ShoppingCartDrawerProps {
  children?: React.ReactNode;
}

export const CartDrawer = ({ children }: ShoppingCartDrawerProps) => {
  const totalAmount = 10;
  const items: CartDrawerItemProps[] = [
    {
      id: 1,
      name: 'test',
      imageUrl: 'https://picsum.photos/200/300',
      quantity: 1,
      price: 100,
      details: 'test',
      onClickCountButton: () => {},
      onClickRemove: () => {},
    },
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='flex h-full flex-col gap-0 p-0'>
        <SheetHeader className='bg-gray-100 p-4'>
          <SheetTitle>
            {totalAmount > 0
              ? `You have ${totalAmount} items in your cart`
              : 'Shopping Cart'}
          </SheetTitle>
          <VisuallyHidden>
            <SheetDescription>Here is list of your products</SheetDescription>
          </VisuallyHidden>
        </SheetHeader>
        <section className='flex-auto bg-white'>
          <div className='p-4'>
            {items.map((item) => (
              <CartDrawerItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={item.details}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </div>
        </section>

        <div className='bg-gray-100 p-4 shadow-[0_-2px_4px_rgba(6,5,50,0.1)]'>
          <CartDrawerTotal
            totalPrice={200}
            deliveryPrice={100}
            itemsCount={3}
            itemsPrice={100}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
