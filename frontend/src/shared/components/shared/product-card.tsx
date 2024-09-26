import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Separator,
} from '@/shared/components/ui';
import Image from 'next/image';
import { PlusIcon } from 'lucide-react';
import { Product } from '@/shared/services/products';
import { VisuallyHidden } from '@radix-ui/themes';
import { currencyToSymbol } from '@/shared/utils';

interface ProductCardProps {
  isOpen: boolean;
  onSubmit: (product: Product) => void;
  onClose: (open: boolean, product: Product) => void;
  data: Product;
}

export const ProductCard = (props: ProductCardProps) => {
  const { data, isOpen, onClose, onSubmit } = props;
  const { name, price, productImageSrc, currencyName, description, id } = data;

  const handleOnClose = (open: boolean) => {
    onClose(open, data);
  };

  const formattedPrice = `${price}${currencyToSymbol(currencyName)}`;

  const ProductPreview = (
    <Card>
      <CardHeader>
        <Image
          width={300}
          height={300}
          src={productImageSrc ?? ''}
          alt={name}
        />
      </CardHeader>
      <CardContent>
        <div className='text-xl font-semibold tracking-tight'>
          {formattedPrice}
        </div>
        <h3 className=''>{name}</h3>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>
          <PlusIcon /> Add
        </Button>
      </CardFooter>
    </Card>
  );

  const ProductDetail = (
    <div>
      <VisuallyHidden>
        <DialogTitle>{name}</DialogTitle>
      </VisuallyHidden>
      <div className='flex gap-16'>
        <Image
          className='rounded-3xl'
          width={400}
          height={400}
          src={productImageSrc ?? ''}
          alt={name}
        />

        <div className='flex flex-col gap-4'>
          <div className='text-2xl font-extrabold'>{name}</div>
          <div className='text-2xl font-bold'>{formattedPrice}</div>
          <Button onClick={() => onSubmit(data)}>
            <PlusIcon /> Add
          </Button>
        </div>
      </div>
      <Separator className='my-4' />
      {description && <DialogDescription>{description}</DialogDescription>}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOnClose}>
      <DialogTrigger asChild>{ProductPreview}</DialogTrigger>
      <DialogContent className={'w-[1200px] max-w-[1200px] p-10'}>
        {ProductDetail}
      </DialogContent>
    </Dialog>
  );
};
