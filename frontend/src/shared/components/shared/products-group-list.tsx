'use client';

import { Product } from '@/shared/services/products';
import { ProductCard } from '@/shared/components/shared';
import { Title } from '@/shared/components/ui';
import { Api } from '@/shared/services/api-client';
import { cartActions } from '@/shared/libs/features/cart/cart.slice';
import { getToastError, getToastSuccess } from '@/shared/libs/utils';
import { useState } from 'react';
import { useAppDispatch } from '@/shared/libs/hooks';

interface ProductsGroupListProps {
  title?: string;
  items: Product[];
  categoryId?: string;
  className?: string;
  onSubmit: (product: Product) => void;
  onClose: () => void;
  isOpen: Product['id'] | null;
}

export const ProductsGroupList = (props: ProductsGroupListProps) => {
  const { items, title, className } = props;
  const [isOpen, setIsOpen] = useState<null | Product['id']>(null);
  const dispatch = useAppDispatch();
  const handleAddProductClick = async (product: Product) => {
    try {
      const result = await Api.cart.addProduct(product.id);
      dispatch(cartActions.addProduct(result));
      setIsOpen(null);
      getToastSuccess('Product added to cart');
    } catch (err) {
      getToastError('Error adding product');
    }
  };

  const handleOnClose = (open: boolean, product: Product) => {
    !open ? setIsOpen(null) : setIsOpen(product.id);
  };

  return (
    <div className={className}>
      {title && <Title className='mb-6' text={title} size='lg' />}
      <div className='grid grid-cols-5 gap-2'>
        {items.map((product) => (
          <ProductCard
            isOpen={isOpen === product.id}
            onClose={handleOnClose}
            onSubmit={handleAddProductClick}
            key={product.id}
            data={product}
          />
        ))}
      </div>
    </div>
  );
};
