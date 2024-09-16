import { Product } from '@/shared/services/products';
import { ProductCard } from '@/shared/components/shared';
import { Title } from '@/shared/components/ui';

interface ProductsGroupListProps {
  title?: string;
  items: Product[];
  categoryId?: string;
  className?: string;
}

export const ProductsGroupList = (props: ProductsGroupListProps) => {
  const { items, title, className } = props;
  return (
    <div className={className}>
      {title && <Title className='mb-6' text={title} size='lg' />}
      <div className='grid grid-cols-5 gap-2'>
        {items.map((product) => (
          <ProductCard key={product.id} data={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};
