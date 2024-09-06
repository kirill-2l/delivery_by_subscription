import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui';
import { PriceText } from '@/shared/components/shared/price-text';
import Image from 'next/image';

interface Props {
  title: string;
  description?: string;
  image?: string;
  price?: number;
  imgHeight?: number;
  imgWidth?: number;
}

export const ProductCard = (props: Props) => {
  const {
    image,
    price,
    title,
    description,
    imgHeight = 300,
    imgWidth = imgHeight,
  } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          alt={title}
          className='aspect-square w-full rounded-md object-cover'
          height={imgHeight}
          width={imgWidth}
          src='/placeholder.svg'
        />
      </CardContent>
      {description && <CardDescription></CardDescription>}
      <CardFooter className='flex items-center justify-between gap-4'>
        <PriceText price={100} currency={'$'} />
        <Button>Select</Button>
      </CardFooter>
    </Card>
  );
};
